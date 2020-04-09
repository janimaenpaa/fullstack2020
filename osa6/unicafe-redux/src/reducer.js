const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  total: 0,
  average: 0,
  positive: 0,
}

const counterReducer = (state = initialState, action) => {
  const average = (add) => {
    return (state.good - state.bad + add) / (state.total + 1)
  }

  const positive = (add) => {
    return ((state.good + add) / (state.total + 1)) * 100
  }

  console.log(action)
  switch (action.type) {
    case "GOOD":
      return (state = {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad,
        total: state.total + 1,
        average: average(1),
        positive: positive(1),
      })
    case "OK":
      return (state = {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad,
        total: state.total + 1,
        average: average(0),
        positive: positive(0),
      })
    case "BAD":
      return (state = {
        good: state.good,
        ok: state.ok,
        bad: state.bad + 1,
        total: state.total + 1,
        average: average(-1),
        positive: positive(0),
      })
    case "ZERO":
      return (state = {
        good: 0,
        ok: 0,
        bad: 0,
        total: 0,
        average: 0,
        positive: 0,
      })
    default:
      return state
  }
}

export default counterReducer
