const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification
    case "CLEAR_NOTIFICATION":
      return null
    default:
      return state
  }
}

let timeoutId

export const setNotification = (message, type) => {
  let notification = { message, type }
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      notification,
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      })
    }, 5 * 1000)
  }
}

export const clearNotification = (id) => ({ type: "CLEAR_NOTIFICATION" })

export default reducer
