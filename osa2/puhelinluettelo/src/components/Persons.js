import React from "react";

const Persons = ({ filter, persons }) => {
  const personsToShow =
    filter.length === 0
      ? persons
      : persons.filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );
  return (
    <div>
      {personsToShow.map((person, i) => (
        <p key={i}>{`${person.name} ${person.number}`}</p>
      ))}
    </div>
  );
};

export default Persons;
