const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ username: 1 , name: 1 , id :1 })

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
  console.log (user)
  try {
    if (!user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user._id,
    })

    if (!body.title || !body.url) {
      return response.status(400).json({ error: 'title and url are required' })
    }

    const blogSaved = await blog.save()
    user.blogs = user.blogs.concat(blogSaved._id)
    await user.save()
    response.status(201).json(blogSaved)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {

  const id = request.params.id

  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (decodedToken.id === id) {
    try {
      await Blog.findByIdAndRemove(request.params.id)

      response.status(204).end()
    } catch (exception) {
      next(exception)
    }

  }else{

    try {
      return response.status(401).json({ error: 'token invalid' })

    } catch (exception) {
      next(exception)

    }

  }
})

blogsRouter.put('/:id', async (request, response, next) => {

  const token = request.token
  const { id } = request.params
  const { title, author, url, likes } = request.body

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id === id) {
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
