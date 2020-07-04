import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styled from "styled-components"

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

  const Button = styled.button`
    color: palevioletred;
    font-size: 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
  `

  const Link = styled.a`
    color: palevioletred;
    font-weight: bold;
  `

  const Title = styled.h2`
    color: palevioletred;
  `

  return (
    <div>
      <Title>{blog ? blog.title : null}</Title>
      <Link href={blog.url}>{blog.url}</Link> <br />
      {blog.likes} likes <Button onClick={() => handleLike(id)}>like</Button>
      <br />
      added by {blog.author}
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input
          id="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />{" "}
        <Button type="submit">add comment</Button>
      </form>
      {comments()}
    </div>
  )
}

export default Blog
