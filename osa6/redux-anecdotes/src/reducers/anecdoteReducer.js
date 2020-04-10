import anecdoteService from "../services/anecdotes"

const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state)
  console.log("action", action)

  switch (action.type) {
    case "NEW_ANECDOTE":
      return [...state, action.data]
    case "VOTE_ANECDOTE":
      const id = action.data.id
      const anecdoteTochange = state.find((a) => a.id === id)
      const changedAnecdote = {
        ...anecdoteTochange,
        votes: anecdoteTochange.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case "INIT_ANECDOTES":
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: "INIT_ANECDOTES", data: anecdotes })
  }
}

export const addVote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.getById(id)
    const votedAnecdote = await anecdoteService.voteAnecdote(anecdote)

    dispatch({
      type: "VOTE_ANECDOTE",
      data: votedAnecdote,
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    })
  }
}

export default anecdoteReducer
