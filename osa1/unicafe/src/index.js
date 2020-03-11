import React, { useState } from "react";
import ReactDOM from "react-dom";

const StatisticLine = ({ text, value, percent }) => {
  if (percent) {
    return <td>{text + " " + value + " %"}</td>;
  }
  return <td>{text + " " + value}</td>;
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <StatisticLine text="good" value={good} />
          </tr>
          <tr>
            <StatisticLine text="neutral" value={neutral} />
          </tr>
          <tr>
            <StatisticLine text="bad" value={bad} />
          </tr>
          <tr>
            <StatisticLine text="all" value={good + neutral + bad} />
          </tr>
          <tr>
            <StatisticLine
              text="average"
              value={(good - bad) / (good + neutral + bad)}
            />
          </tr>
          <tr>
            <StatisticLine
              text="positive"
              value={(good / (good + bad + neutral)) * 100}
              percent={true}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
