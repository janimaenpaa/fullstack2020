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
          id="title"
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleInputChange}
        />
        <br />
        author:
        <input
          id="author"
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleInputChange}
        />
        <br />
        url:
        <input
          id="url"
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleInputChange}
        />
        <br />
        <button id="create" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
