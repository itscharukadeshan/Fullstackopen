/** @format */

import React from "react";
import NodeCourse from "./NodeCourse";
import ReactCourse from "./ReactCourse";
import Header from "./ Header";

export default function Course() {
  return (
    <>
      <Header />
      <ReactCourse />
      <NodeCourse />
    </>
  );
}
