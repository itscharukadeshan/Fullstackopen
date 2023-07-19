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
    return (
      <div>
        Loading<span className='loading loading-bars loading-md'></span>
      </div>
    );
  }
  if (!error === null) {
    return <></>;
  }

  if (error) {
    return (
      <div className='my-6 text-warning font-mono'>
        Error fetching country data
      </div>
    );
  }

  if (!countryData) {
    return null;
  }

  return (
    <div className=' bg-slate-400 bg-opacity-70 p-6 rounded-md my-12 text-slate-900'>
      <h3 className='text-2xl mb-4 font-bold'>{countryData.name}</h3>

      <img
        className=' shadow-sm my-2'
        src={countryData.flags.png}
        height='100'
        alt={`the flag of ${countryData.name}`}
      />

      <div className='text-md mt-4 font-bold'>
        Capital : {countryData.capital}
      </div>

      <div className='text-md font-bold'>
        population : {countryData.population}
      </div>
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
    <div className='flex flex-col items-center m-20'>
      <form className='flex flex-row gap-6 items-center' onSubmit={fetch}>
        <input
          className='input input-sm input-bordered rounded-none'
          {...nameInput}
        />
        <button className='btn btn-sm '>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
