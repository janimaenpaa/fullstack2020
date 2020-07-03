const blogsRouter = require("express").Router()
const jwt = require("jsonwebtoken")

const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  })

  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" })
    }

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: "title or url missing" })
    }

    if (body.likes === undefined) {
      body.likes = 0
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" })
    }

    const blog = await Blog.findById(request.params.id)

    if (blog === null) {
      return response.status(404).json({ error: "blog not found" })
    }

    const user = await User.findById(decodedToken.id)

    if (blog.user.toString() === user.id.toString()) {
      const deletedBlog = await blog.delete()
      response.json(deletedBlog)
    } else {
      return response.status(401).json({ error: "token missing or invalid" })
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  }

  try {
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(blog)
  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter
