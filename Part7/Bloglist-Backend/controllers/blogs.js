const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    let blog = await Blog.findById(request.params.id)

    if (blog) {
      response.status(201).json(blog)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = request.user

  try {
    if (!user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    })

    if (!body.title || !body.url) {
      return response.status(400).json({ error: 'title and url are required' })
    }

    const blogSaved = await blog.save()
    user.blogs = user.blogs.concat(blogSaved._id)
    await user.save()
    const responseBlog = {
      ...blogSaved.toJSON(),
      user: { name: user.name, username: user.username, id: user.id },
    }

    response.status(201).json(responseBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)

  try {
    const blog = await Blog.findById(id)

    if (blog) {
      if (decodedToken.id === blog.user.toString()) {
        await Blog.findByIdAndRemove(id)
        response.status(204).end()
      } else {
        response.status(401).json({
          error: 'Unauthorized: You do not have permission to delete this blog',
        })
      }
    } else {
      response.status(404).json({ error: 'Blog not found' })
    }
  } catch (exception) {
    next(exception)
  }
})
blogsRouter.put('/:id/likes', async (req, res, next) => {
  const { id } = req.params
  const token = req.token
  const { likes } = req.body

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  try {
    const updatedLikesResult = await Blog.findByIdAndUpdate(
      { _id: id },
      { $set: { likes } }
    )
    res.status(200).json(updatedLikesResult)
  } catch (exception) {
    next(exception)
  }
})
blogsRouter.post('/:id/comments', async (req, res, next) => {
  const { id } = req.params

  const { text, userId } = req.body

  const newComment = {
    text,
    user: userId,
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $push: { comments: newComment } },
      { new: true }
    )

    res.status(201).json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const token = request.token
  const { id } = request.params
  const { title, author, url, likes } = request.body

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (decodedToken.id !== id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const updatedBlog = {
    title,
    author,
    url,
    likes,
  }
  try {
    const updatedBlogResult = await Blog.findByIdAndUpdate(id, updatedBlog, {
      new: true,
      omitUndefined: true,
    })

    if (updatedBlogResult) {
      response.status(204).json(updatedBlogResult)
    } else {
      response.status(404).json({ error: 'Blog not found' })
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.use((exception, request, response, next) => {
  if (
    exception.message.includes(
      'Blog validation failed : title: Path `title` is required'
    )
  ) {
    response.status(400).json({
      error: 'Bad request. Please check your input.',
    })
  } else if (
    exception.message.includes(
      'Blog validation failed : url: Path `url` is not a valid URL'
    )
  ) {
    response.status(400).json({
      error: 'Bad request. Invalid URL.',
    })
  } else {
    next(exception)
  }
})

module.exports = blogsRouter
