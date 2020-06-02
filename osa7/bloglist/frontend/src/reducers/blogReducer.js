import blogService from "../services/blogs"

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case "INIT":
            return action.data
        case "CREATE":
            return [...state, action.data]
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const data = await blogService.getAll()
        dispatch({
            type: "INIT",
            data
        })
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        console.log("blogReducer: " + blog)
        const newBlog = await blogService.create(blog)
        dispatch({
            type: "CREATE",
            data: newBlog
        })
    }
}

export default blogReducer