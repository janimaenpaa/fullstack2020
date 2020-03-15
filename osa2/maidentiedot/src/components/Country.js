import React from "react";

import Weather from "./Weather";

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>
        capital {country.capital} <br />
        population {country.population}
      </p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language, i) => (
          <li key={i}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="Flag" width="200px" />

      <Weather city={country.capital} />
    </div>
  );
};

export default Country;
