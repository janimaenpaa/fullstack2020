const User = require("../models/user")
const Blog = require("../models/blog")

const initialBlogs = [
  {
    title:
      "The most important lessons I’ve learned after a year of working with React",
    author: "Tomas Eglinskas",
    url:
      "https://medium.com/free-code-camp/mindset-lessons-from-a-year-with-react-1de862421981",
    likes: 10,
  },
  {
    title: "Building a simple REST API with NodeJS and Express.",
    author: "Onejohi",
    url:
      "https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9",
    likes: 1,
  },
]

const nonExistingId = async () => {
  const note = new Blog({ title: "willremovethissoon" })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((b) => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
