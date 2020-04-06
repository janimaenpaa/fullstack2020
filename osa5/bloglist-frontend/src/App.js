import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"

import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMessage("wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistUser")
    setUser(null)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = { title, author, url }
      const newBlog = await blogService.create(blogObject)
      console.log(newBlog)
      setBlogs(blogs.concat(newBlog))
      setTitle("")
      setAuthor("")
      setUrl("")
      setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
    } catch (exception) {
      setErrorMessage("title or url missing")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        {"username "}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        {"password "}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleNewBlog}>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        url:
        <input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button>create</button>
      </form>
    </div>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      <p>
        {user.name} logged in{" "}
        <button onClick={() => handleLogout()}>logout</button>
      </p>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
