import React from "react"
import ReactDOM from "react-dom"
import { createStore } from "redux"
import reducer from "./reducer"

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    })
  }
  const ok = () => {
    store.dispatch({
      type: "OK",
    })
  }
  const bad = () => {
    store.dispatch({
      type: "BAD",
    })
  }

  const reset = () => {
    store.dispatch({
      type: "ZERO",
    })
  }

  const StatisticLine = ({ text, value, percent }) => {
    if (percent) {
      return <td>{text + " " + value + " %"}</td>
    }
    return <td>{text + " " + value}</td>
  }

  const Statistics = () => {
    if (store.getState().total === 0) {
      return <p>No feedback given</p>
    }

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <StatisticLine text="good" value={store.getState().good} />
            </tr>
            <tr>
              <StatisticLine text="ok" value={store.getState().ok} />
            </tr>
            <tr>
              <StatisticLine text="bad" value={store.getState().bad} />
            </tr>
            <tr>
              <StatisticLine text="total" value={store.getState().total} />
            </tr>
            <tr>
              <StatisticLine text="average" value={store.getState().average} />
            </tr>
            <tr>
              <StatisticLine
                text="positive"
                value={store.getState().positive}
                percent={true}
              />
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset</button>
      <h2>statistics</h2>
      <Statistics />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"))
}

renderApp()
store.subscribe(renderApp)
