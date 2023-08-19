/** @format */

import express from "express";
import patientRouter from "./routers/patient";
import cors from "cors";

const app = express();

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.use("/api/patients", patientRouter);

app.get("/api/ping", (_req, res) => {
  const response = {
    message: "pong",
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
