import React from "react";

const Filter = ({ filter, handleInputChange }) => {
  return (
    <div>
      find countries <input value={filter} onChange={handleInputChange} />
    </div>
  );
};

export default Filter;
