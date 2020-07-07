import React from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Recommendations = ({ show, user }) => {
  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: user.favoriteGenre },
  })

  if (!show) {
    return null
  }

  if (booksResult.loading) {
    return <div>loading...</div>
  }

  const books = booksResult.data.allBooks
  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{user.favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              <b>author</b>
            </th>
            <th>
              <b>published</b>
            </th>
          </tr>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
