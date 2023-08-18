/** @format */

import express from "express";
const app = express();

app.get("/bmi", (_req, res) => {
  res.send("pong");
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
