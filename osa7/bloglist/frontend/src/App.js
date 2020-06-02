import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { connect } from "react-redux"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import NewBlog from "./components/NewBlog"
import { setNotification } from "./reducers/notificationReducer"
import { initializeBlogs, createBlog } from "./reducers/blogReducer"

import loginService from "./services/login"
import storage from "./utils/storage"

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      setUsername("")
      setPassword("")
      setUser(user)
      dispatch(setNotification(`${user.name} welcome back!`))
      storage.saveUser(user)
    } catch (exception) {
      dispatch(setNotification("wrong username/password", "error"))
    }
  }

  const addBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      console.log(blog)
      dispatch(createBlog(blog))
      dispatch(
        setNotification(
          `a new blog '${blog.title}' by ${blog.author} added!`,
          "success"
        )
      )
    } catch (exception) {
      console.log(exception)
    }
  }

  /*   const handleLike = async (id) => {
    const blogToLike = blogs.find((b) => b.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    }
    await blogService.update(likedBlog)
    setBlogs(
      blogs.map((b) =>
        b.id === id ? { ...blogToLike, likes: blogToLike.likes + 1 } : b
      )
    )
  } */

  /*   const handleRemove = async (id) => {
    const blogToRemove = blogs.find((b) => b.id === id)
    const ok = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
    )
    if (ok) {
      await blogService.remove(id)
      setBlogs(blogs.filter((b) => b.id !== id))
    }
  } */

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login">login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog createBlog={addBlog} />
      </Togglable>

      {blogs.sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          // handleLike={handleLike}
          // handleRemove={handleRemove}
          own={user.username === blog.user.username}
        />
      ))}
    </div>
  )
}

export default connect(null, { setNotification, createBlog })(App)
