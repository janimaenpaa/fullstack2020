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

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  try {
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json({ message: "blog updated" })
  } catch (err) {
    response.status(500).json(err.message)
  }
})

module.exports = blogsRouter
