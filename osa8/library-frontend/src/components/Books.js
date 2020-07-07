import React, { useState, useEffect } from "react"
import { useQuery, useLazyQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [genre, setGenre] = useState("")
  const [allGenres, setAllGenres] = useState([])
  const booksResult = useQuery(ALL_BOOKS)
  const [loadGenre, { called, loading, data }] = useLazyQuery(ALL_BOOKS, {
    variables: { genre },
  })

  useEffect(() => {
    if (!booksResult.loading) {
      console.log(booksResult)
      let genres = []
      // Add all genre items to an array
      booksResult.data.allBooks.map((book) =>
        book.genres.map((genre) => genres.push(genre))
      )
      // Make array items unique
      genres = [...new Set(genres)]
      setAllGenres(genres)
    }
  }, [booksResult])

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  if (!called) {
    loadGenre()
  }

  const bookRows = () => {
    return data.allBooks.map((a) => (
      <tr key={a.title}>
        <td>{a.title}</td>
        <td>{a.author.name}</td>
        <td>{a.published}</td>
      </tr>
    ))
  }

  if (!data) {
    return <div>no books...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <div>in genre {genre === "" ? <b>all genres</b> : <b>{genre}</b>}</div>

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
      {allGenres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre("")}>all genres</button>
    </div>
  )
}

export default Books
