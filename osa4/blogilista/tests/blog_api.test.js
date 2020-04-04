const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")
const bcrypt = require("bcrypt")
const api = supertest(app)

const Blog = require("../models/blog")
const User = require("../models/user")

describe("when there are two blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
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

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test("a specific blog is within the returned notes", async () => {
    const response = await api.get("/api/blogs")

    const contents = response.body.map((r) => r.title)

    expect(contents).toContain(
      "Building a simple REST API with NodeJS and Express."
    )
  })

  test("id attributes are defined", async () => {
    const response = await api.get("/api/blogs")
    const ids = response.body.map((r) => r.id)
    expect(ids).toBeDefined()
  })

  test("a blog can be added", async () => {
    const newBlog = {
      title: "A new blog",
      author: "Matti Meikäläinen",
      url: "www.google.com",
      likes: 10,
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")

    const contents = response.body.map((r) => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain("A new blog")
  })

  test("if likes is not set, set likes to 0", async () => {
    const newBlog = {
      title: "A new blog for testing likes",
      author: "Matti Meikäläinen",
      url: "www.google.com",
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")

    const likes = response.body
      .filter((r) => r.title === "A new blog for testing likes")
      .map((r) => r.likes)

    expect(likes[0]).toBe(0)
  })

  test("if title or url are undefined responds with status 400", async () => {
    const newBlog = {
      author: "Matti Meikäläinen",
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/)
  })
})

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
  })

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "mmallikas",
      name: "Mikko Mallikas",
      password: "salainen",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
