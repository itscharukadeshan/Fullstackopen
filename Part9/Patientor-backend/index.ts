/** @format */

import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3000;

app.get("/api/ping", (_req, res) => {
  const response = {
    message: "pong",
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});