import React, { useState, useEffect } from "react";

import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then(response => {
      console.log("promise fulfilled");
      setPersons(response.data);
      console.log(response.data);
      
    });
  }, []);

  const addPerson = event => {
    event.preventDefault();

    if (persons.find(person => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }

    const nameObject = {
      name: newName,
      number: newNumber
    };
    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        text="filter shown with"
        value={filter}
        handleFilterChange={handleFilterChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons} />
    </div>
  );
};

export default App;
