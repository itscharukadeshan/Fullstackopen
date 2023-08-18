/** @format */

import express from "express";
import calculateBmi from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { parseNumberArray } from "./utils";

const app = express();
app.use(express.json());

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises) || typeof target !== "number") {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  try {
    const parsedDays = Array.isArray(daily_exercises)
      ? parseNumberArray(daily_exercises)
      : undefined;

    if (parsedDays !== undefined && !isNaN(Number(target))) {
      const results = calculateExercises(parsedDays, Number(target));

      return res.send({ results });
    }
  } catch (error) {
    return res.status(400).json({ error: "something went wrong" });
  }
  return res.status(400).json({ error: "Check the data again" });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
