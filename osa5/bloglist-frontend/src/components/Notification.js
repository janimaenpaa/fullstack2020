import React from "react"

import "./Notification.css"

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.includes("added")) {
    return <div className="add">{message}</div>
  }

  return <div className="error">{message}</div>
}

export default Notification
