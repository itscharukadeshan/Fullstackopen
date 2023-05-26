const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})


blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', async (request, response,next) => {
  const body = request.body

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  try {
    const saveBlog = await blog.save()
    response.status(201).json(saveBlog)
  } catch(exception) {

    console.log('Error saving blog:', exception.message)
    next(exception)
  }
})


blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

blogsRouter.use((exception, request, response, next) => {
  if (exception.message.includes('Blog validation failed : title: Path `title` is required')) {
    response.status(400).json({
      error: 'Bad request. Please check your input.',
    })
  } else if (exception.message.includes('Blog validation failed : url: Path `url` is not a valid URL')) {
    response.status(400).json({
      error: 'Bad request. Invalid URL.',
    })
  } else {
    next(exception)
  }
})



module.exports = blogsRouter
