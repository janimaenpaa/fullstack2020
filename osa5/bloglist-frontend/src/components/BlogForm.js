import React, { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    console.log(newBlog)

    setNewBlog({ title: "", author: "", url: "" })
  }

  const handleInputChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        title:
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleInputChange}
        />
        <br />
        author:
        <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleInputChange}
        />
        <br />
        url:
        <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
