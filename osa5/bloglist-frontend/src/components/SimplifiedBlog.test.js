import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import { prettyDOM, getByText } from "@testing-library/dom"
import SimplifiedBlog from "./SimplifiedBlog"

test("only title and author are rendered", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Timo Taitaja",
    likes: 0,
    url: "http://react.js.org",
  }
  let component = render(<SimplifiedBlog blog={blog} />)
  component.debug()
  expect(component.container).toHaveTextContent(
    "Component testing is done with react-testing-library"
  )
  expect(component.container).toHaveTextContent("Timo Taitaja")
  expect(component.container).not.toHaveTextContent("http://react.js.org 0")
})

test("when view button is pressed, url and likes are rendered", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Timo Taitaja",
    likes: 0,
    url: "http://react.js.org",
  }
  let component = render(<SimplifiedBlog blog={blog} />)

  const viewButton = component.getByText("view")
  fireEvent.click(viewButton)

  expect(component.container).toHaveTextContent("http://react.js.org 0")
  
})

test("clicking the likeButton twice calls event handler twice", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Timo Taitaja",
    likes: 0,
    url: "http://react.js.org",
  }
  const mockHandler = jest.fn()
  const component = render(<SimplifiedBlog blog={blog} like={mockHandler} />)

  const viewButton = component.getByText("view")
  fireEvent.click(viewButton)

  const likeButton = component.getByText("like")
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
