import React, { useState, useEffect } from "react"
import { useApolloClient, useQuery } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Recommendations from "./components/Recommendations"
import { GET_USER } from "./queries"

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("library-user-token"))
  const [page, setPage] = useState("authors")
  const client = useApolloClient()
  const [user, setUser] = useState({})

  const { data } = useQuery(GET_USER)

  useEffect(() => {
    if (data) {
      setUser(data.me)
    }
  }, [data])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      {token ? (
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => setPage("recommendations")}>recommend</button>
          <button onClick={() => logout()}>logout</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>login</button>
        </div>
      )}

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendations show={page === "recommendations"} user={user} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App
