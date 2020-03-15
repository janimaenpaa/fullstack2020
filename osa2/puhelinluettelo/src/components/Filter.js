import React from "react";

const Filter = ({ text, value, handleFilterChange }) => {
  return (
    <div>
      {text} <input value={value} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
