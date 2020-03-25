const http = require("http")
const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")

const config = require("./utils/config")
const logger = require("./utils/logger")
const Blog = require("./models/blog")

app.use(cors())
app.use(express.json())

morgan.token("body", req => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
)

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
