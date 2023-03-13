/** @format */

import React from "react";
import Header from "./components/ Header";
import Content from "./components/Content";
import Course from "./components/Course";

const App = () => {
  return (
    <>
      <h1>Web development curriculum</h1>
      <Header course={Course} />
      <Content course={Course} />
    </>
  );
};

export default App;
