import React, { useState, useEffect } from "react";

import axios from "axios";

import Country from "./components/Country";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      console.log("promise fulfilled");
      setCountries(response.data);
      console.log(response.data);
    });
  }, []);

  const handleInputChange = event => {
    setFilter(event.target.value);
  };

  const buttonHandler = country => {
    setFilter(country);
  };

  const countriesToShow =
    filter.length === 0
      ? countries
      : countries.filter(country =>
          country.name.toLowerCase().includes(filter.toLowerCase())
        );

  const showCountries = () => {
    if (countriesToShow.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (countriesToShow.length > 1) {
      return countriesToShow.map((country, i) => (
        <div key={i}>
          {country.name}{" "}
          <button onClick={() => buttonHandler(country.name)}>show</button>
        </div>
      ));
    }

    return countriesToShow.map(country => (
      <Country key={country.name} country={country} />
    ));
  };

  return (
    <div>
      <Filter filter={filter} handleInputChange={handleInputChange} />
      {showCountries()}
    </div>
  );
};

export default App;
