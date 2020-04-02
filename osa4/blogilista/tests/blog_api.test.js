const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")

const initialBlogs = [
  {
    title:
      "The most important lessons I’ve learned after a year of working with React",
    author: "Tomas Eglinskas",
    url:
      "https://medium.com/free-code-camp/mindset-lessons-from-a-year-with-react-1de862421981",
    likes: 10
  },
  {
    title: "Building a simple REST API with NodeJS and Express.",
    author: "Onejohi",
    url:
      "https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9",
    likes: 1
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs")

  expect(response.body).toHaveLength(initialBlogs.length)
})

test("a specific blog is within the returned notes", async () => {
  const response = await api.get("/api/blogs")

  const contents = response.body.map(r => r.title)

  expect(contents).toContain(
    "Building a simple REST API with NodeJS and Express."
  )
})

test("id attributes are defined", async () => {
  const response = await api.get("/api/blogs")
  const ids = response.body.map(r => r.id)
  expect(ids).toBeDefined()
})

test("a blog can be added", async () => {
  const newBlog = {
    title: "A new blog",
    author: "Matti Meikäläinen",
    url: "www.google.com",
    likes: 10
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain("A new blog")
})

test("if likes is not set, set likes to 0", async () => {
  const newBlog = {
    title: "A new blog for testing likes",
    author: "Matti Meikäläinen",
    url: "www.google.com"
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")

  const likes = response.body
    .filter(r => r.title === "A new blog for testing likes")
    .map(r => r.likes)

  expect(likes[0]).toEqual(0)
})

test("if title or url are undefined responds with status 400", async () => {
  const newBlog = {
    author: "Matti Meikäläinen"
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})
