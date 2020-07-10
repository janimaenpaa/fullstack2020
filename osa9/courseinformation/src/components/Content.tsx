import React from "react"
import { CoursePart } from "../types"
import Part from "./Part"

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  return (
    <div>
      <h3>Parts</h3>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  )
}

export default Content
