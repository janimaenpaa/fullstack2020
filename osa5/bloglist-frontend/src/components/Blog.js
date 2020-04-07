import React, { useState } from "react"

import blogService from "../services/blogs"

const Blog = ({ blog, blogs, setBlogs, setErrorMessage }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginTop: 5,
  }

  const showWhenNotVisible = () => (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setBlogVisible(true)}>view</button>
      </div>
    </div>
  )

  const showWhenVisible = () => (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => setBlogVisible(false)}>hide</button> <br />
      {blog.url} <br />
      likes {blog.likes} <button onClick={handleLike}>like</button>
      <br />
      {blog.user.name} <br />
      <button>remove</button>
    </div>
  )

  const handleLike = async (event) => {
    try {
      const id = blog.id

      const blogObject = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      }

      const updatedBlog = await blogService.update(id, blogObject)
      console.log(updatedBlog)
      blog.likes = updatedBlog.likes
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    } catch (exception) {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {!blogVisible && showWhenNotVisible()}
      {blogVisible && showWhenVisible()}
    </div>
  )
}

export default Blog
