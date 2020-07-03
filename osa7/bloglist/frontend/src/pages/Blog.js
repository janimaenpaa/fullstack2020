import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const Blog = ({ handleLike }) => {
  const id = useParams().id
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog ? blog.title : null}</h2>
      <a href={blog.url}>{blog.url}</a> <br />
      {blog.likes} likes <button onClick={() => handleLike(id)}>like</button>
      <br />
      added by {blog.author}
    </div>
  )
}

export default Blog
