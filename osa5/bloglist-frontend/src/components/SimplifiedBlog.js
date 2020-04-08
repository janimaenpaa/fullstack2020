import React, { useState } from "react"

const SimplifiedBlog = ({ blog, like }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  return (
    <div>
      {!blogVisible && (
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setBlogVisible(true)}>view</button>
        </div>
      )}
      {blogVisible && (
        <div>
          {blog.url} <br />
          {blog.likes} likes
          <button onClick={like}>like</button>
        </div>
      )}
    </div>
  )
}

export default SimplifiedBlog
