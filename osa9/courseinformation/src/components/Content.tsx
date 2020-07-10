import React from "react"

interface Course {
  name: string
  exerciseCount: number
}

interface CoursesProps {
  courses: Course[]
}

const Content = (props: CoursesProps) => {
  return (
    <div>
      {props.courses.map((course) => (
        <p>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  )
}

export default Content
