import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { connect } from "react-redux"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import styled from "styled-components"

// Components
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import NewBlog from "./components/NewBlog"
import Navigation from "./components/Navigation"

// Reducers
import { setNotification } from "./reducers/notificationReducer"
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  removeBlog,
  addComment,
} from "./reducers/blogReducer"
import { login, logout, setUser } from "./reducers/userReducer"
import { initializeUsers } from "./reducers/usersReducer"

// Utils
import storage from "./utils/storage"

// Pages
import Users from "./pages/Users"
import User from "./pages/User"
import BlogView from "./pages/Blog"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const user = useSelector(({ user }) => {
    return user
  })

  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loginUser = storage.loadUser()
    dispatch(setUser(loginUser))
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loginUser = {
        username,
        password,
      }

      dispatch(login(loginUser))
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log(exception)
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

  const handleLike = async (id) => {
    const blogToLike = blogs.find((b) => b.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    }
    dispatch(likeBlog(likedBlog))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find((b) => b.id === id)
    const ok = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
    )
    if (ok) {
      dispatch(removeBlog(id))
    }
  }

  const handleComment = async (id, comment) => {
    dispatch(addComment(id, comment))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  // Styling
  const Page = styled.div`
    padding: 2em;
  `

  const AppName = styled.h2`
    color: #488fc2;
    font-weight: bold;
    font-size: 2.5em;
  `

  if (user === null) {
    return (
      <Page>
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
      </Page>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <Page>
      <Router>
        <div>
          <Navigation user={user} handleLogout={handleLogout} />
          <AppName>blog app</AppName>
          <Notification />
        </div>
        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <BlogView handleLike={handleLike} addComment={handleComment} />
          </Route>
          <Route path="/">
            <div>
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <NewBlog createBlog={addBlog} />
              </Togglable>

              {blogs.sort(byLikes).map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleLike={handleLike}
                  handleRemove={handleRemove}
                  own={user.username === blog.user.username}
                />
              ))}
            </div>
          </Route>
        </Switch>
      </Router>
    </Page>
  )
}

export default connect(null, {
  setNotification,
  createBlog,
  likeBlog,
  removeBlog,
  addComment,
  login,
  logout,
  setUser,
  initializeUsers,
})(App)
