import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"

const Authors = (props) => {
  const [name, setName] = useState("")
  const [bornTo, setBornTo] = useState("")
  const result = useQuery(ALL_AUTHORS)

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, setBornTo: bornTo } })

    setName("")
    setBornTo("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        name
        <input value={name} onChange={({ target }) => setName(target.value)} />
        <br />
        born
        <input
          type="number"
          value={bornTo}
          onChange={({ target }) => setBornTo(Number(target.value))}
        />
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
