import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { resetNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  }

  const reset = () => {
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  if (notification === null) {
    return <div></div>
  }

  return (
    <div style={style}>
      {notification}
      {reset()}
    </div>
  )
}

export default Notification
