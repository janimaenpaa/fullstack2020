import React from "react"
import { Link } from "react-router-dom"

const Navigation = ({ user, handleLogout }) => {
  const style = {
    padding: 5,
    backgroundColor: "lightgrey",
  }
  return (
    <div style={style}>
      <Link to="/">blogs</Link> <Link to="/users">users</Link> {user.name}{" "}
      logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Navigation
