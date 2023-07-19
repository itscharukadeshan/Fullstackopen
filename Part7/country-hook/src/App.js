/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };
  const resetValue = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    resetValue,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    setError(null);

    axios
      .get(`https://restcountries.com/v2/name/${name}`)
      .then((response) => {
        setCountry(response.data[0]);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  return {
    country,
    loading,
    error,
  };
};

const Country = ({ country }) => {
  const { isLoading, error, country: countryData } = country;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!error === null) {
    return <></>;
  }

  if (error) {
    return <div>Error fetching country</div>;
  }

  if (!countryData) {
    return null;
  }

  return (
    <div>
      <h3>{countryData.name}</h3>

      <img
        src={countryData.flags.png}
        height='100'
        alt={`the flag of ${countryData.name}`}
      />

      <div>Capital : {countryData.capital}</div>

      <div>population : {countryData.population}</div>
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
    nameInput.resetValue();
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
