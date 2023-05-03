/** @format */

import React from "react";
import Search from "./component/Search.jsx";
import countries from "./service/countries";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);

  return (
    <div>
      <Search />
    </div>
  );
}

export default App;
