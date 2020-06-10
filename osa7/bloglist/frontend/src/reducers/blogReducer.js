import blogService from "../services/blogs"

const blogReducer = (state = [], action) => {
  let id = action.data

  switch (action.type) {
    case "INIT":
      return action.data
    case "CREATE":
      return [...state, action.data]
    case "REMOVE":
      return state.filter((b) => b.id !== id)
    case "LIKE":
      const blogToLike = state.find((b) => b.id === id)
      return state.map((b) =>
        b.id === id ? { ...blogToLike, likes: blogToLike.likes + 1 } : b
      )
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    dispatch({
      type: "INIT",
      data,
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    await blogService.create(blog)
    dispatch({
      type: "CREATE",
      data: blog,
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog)
    dispatch({
      type: "LIKE",
      data: blog.id,
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: "REMOVE",
      data: id,
    })
  }
}

export default blogReducer
