import React from "react";

const Total = ({ parts }) => {
  let initValue = 0;
  const total = parts.reduce((s, p) => {
    return s + p.exercises;
  }, initValue);
  return <p>Number of exercises {total}</p>;
};

export default Total;
