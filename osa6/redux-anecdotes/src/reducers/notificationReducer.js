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

export const createNotification = (notification) => {
  return {
    type: "NEW_NOTIFICATION",
    notification,
  }
}

export const resetNotification = () => {
  return { type: "RESET_NOTIFICATION" }
}

export default notificationReducer
