import React from "react"

import { CoursePart } from "../types"
import { assertNever } from "../utils"

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <p>
          <b>{part.name}</b>
          <br />
          {part.description && (
            <div>
              <span>Description: {part.description}</span>
              <br />
            </div>
          )}
          <span>Exercises: {part.exerciseCount}</span>
        </p>
      )
    case "Using props to pass data":
      return (
        <p>
          <b>{part.name}</b> <br />
          <span>Projects: {part.groupProjectCount}</span> <br />
          <span>Exercises: {part.exerciseCount}</span>
        </p>
      )
    case "Deeper type usage":
      return (
        <p>
          <b>{part.name}</b> <br />
          {part.description && (
            <div>
              <span>Description: {part.description}</span>
              <br />
            </div>
          )}
          <span>Exercises: {part.exerciseCount}</span> <br />
          <span>
            Submission:{" "}
            <a href={part.exerciseSubmissionLink}>
              {part.exerciseSubmissionLink}
            </a>
          </span>
        </p>
      )
    case "This is deep":
      return (
        <p>
          <b>{part.name}</b> <br />
          <span>Description: {part.description}</span>
          <br />
          <span>Exercises: {part.exerciseCount}</span> <br />
        </p>
      )
    default:
      return assertNever(part)
  }
}

export default Part
