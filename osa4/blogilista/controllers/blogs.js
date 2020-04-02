const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.post("/", (request, response) => {
  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).json({ error: "title or url missing" })
  }

  if (request.body.likes === undefined) {
    request.body.likes = 0
  }

  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})

module.exports = blogsRouter
