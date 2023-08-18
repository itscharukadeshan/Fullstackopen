/** @format */

import express from "express";
import calculateBmi from "./bmiCalculator";

const app = express();

app.get("/bmi", (req, res) => {
  if (!req.query.height || !req.query.weight) {
    return res.status(400).json({ error: "malformed parameters" });
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (Number.isNaN(height) || Number.isNaN(weight)) {
    return res.status(400).json({ error: "malformed parameters" });
  }

  try {
    const result = calculateBmi(height, weight);

    return res.json({ weight, height, result });
  } catch (error) {
    return res.status(400).json({ error: "something went wrong" });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
