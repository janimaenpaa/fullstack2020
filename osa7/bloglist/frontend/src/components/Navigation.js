import React from "react"
import styled from "styled-components"

const Navigation = ({ user, handleLogout }) => {
  const Menu = styled.div`
    background: #777778;
    border-radius: 3px;
    padding: 10px;
    color: white;
    display: flex;
    justify-content: space-between;
  `

  const Button = styled.button`
    color: palevioletred;
    font-size: 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
  `

  const Link = styled.a`
    color: palevioletred;
    font-weight: bold;
    text-decoration: none;
    padding-right: 10px;
    padding-left: 10px;
    font-size: 1.5em;
  `
  
  return (
    <Menu>
      <div>
        <Link href="/">blogs</Link>
        {"  "}
        <Link href="/users">users</Link>
      </div>
      <div>
        {user.name} logged in <Button onClick={handleLogout}>logout</Button>
      </div>
    </Menu>
  )
}

export default Navigation
