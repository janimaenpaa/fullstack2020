import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const User = () => {
  const id = useParams().id

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const users = useSelector(({ users }) => {
    return users
  })

  const user = users.find((user) => user.id === id)

  return (
    <div>
      <h2>{user ? user.name : null}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs
          .filter((blog) => id === blog.user.id)
          .map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
      </ul>
    </div>
  )
}

export default User
