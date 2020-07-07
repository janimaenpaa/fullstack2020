import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [genre, setGenre] = useState("all")
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  console.log(books)

  const allGenres = () => {
    let genres = []
    // Add all genre items to an array
    books.map((book) => book.genres.map((genre) => genres.push(genre)))
    // Make array items unique
    genres = [...new Set(genres)]
    return genres
  }

  const bookRows = () => {
    if (genre === "all") {
      return books.map((a) => (
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      ))
    }
    return books
      .filter((book) => book.genres.includes(genre))
      .map((a) => (
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      ))
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        in genre <b>{genre}</b>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookRows()}
        </tbody>
      </table>
      {allGenres().map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre("all")}>all genres</button>
    </div>
  )
}

export default Books
