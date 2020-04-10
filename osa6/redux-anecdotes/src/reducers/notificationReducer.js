const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.notification
    case "RESET_NOTIFICATION":
      return null
    default:
      return state
  }
}

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: "NEW_NOTIFICATION",
      notification,
    })
    setTimeout(() => {
      dispatch({ type: "RESET_NOTIFICATION" })
    }, time * 1000)
  }
}

export const resetNotification = () => {
  return { type: "RESET_NOTIFICATION" }
}

export default notificationReducer
