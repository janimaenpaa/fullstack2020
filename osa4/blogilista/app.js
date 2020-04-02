const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const blogsRouter = require("./controllers/blogs")

app.use(cors())
app.use(express.json())

morgan.token("body", req => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
)

app.use("/api/blogs", blogsRouter)

module.exports = app
