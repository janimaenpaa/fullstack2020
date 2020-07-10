import React from "react"

interface Course {
  name: string
  exerciseCount: number
}

interface CourseProps {
  courses: Course[]
}

const Total = (props: CourseProps) => {
  return (
    <p>
      Number of exercises{" "}
      {props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

export default Total
