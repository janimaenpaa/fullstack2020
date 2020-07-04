import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const Blog = ({ handleLike, addComment }) => {
  const [comment, setComment] = useState("")

  const id = useParams().id
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const blog = blogs.find((blog) => blog.id === id)

  const handleComment = (event) => {
    event.preventDefault()

    addComment(id, comment)
    setComment("")
  }

  if (!blog) {
    return null
  }

  const comments = () => {
    if (blog.comments.length === 0) {
      return <p>no comments yet</p>
    }

    return (
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      <h2>{blog ? blog.title : null}</h2>
      <a href={blog.url}>{blog.url}</a> <br />
      {blog.likes} likes <button onClick={() => handleLike(id)}>like</button>
      <br />
      added by {blog.author}
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input
          id="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      {comments()}
    </div>
  )
}

export default Blog
