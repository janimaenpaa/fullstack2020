import loginService from "../services/login"
import storage from "../utils/storage"

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.data
    case "LOGOUT":
      return (state = null)
    default:
      return state
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      dispatch({
        type: "LOGIN",
        data: user,
      })

      storage.saveUser(user)
    } catch (error) {
      console.log(error)
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    storage.logoutUser()
    dispatch({
      type: "LOGOUT",
    })
  }
}

export const setUser = (user) => {
  return async (dispatch) => {
    storage.saveUser(user)
    await dispatch({
      type: "LOGIN",
      data: user,
    })
  }
}

export default userReducer
