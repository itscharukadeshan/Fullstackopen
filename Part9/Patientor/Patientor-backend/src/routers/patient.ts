/** @format */

import express from "express";
import patientServices from "../services/patientServices";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientServices.getNonSensitivePatientData());
});

router.get("/:id", (req, res) => {
  const patient = patientServices.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404).json({ error: "something went wrong" });
  }
});

router.post("/", (req, res) => {
  const newPatientEntry = toNewPatientEntry(req.body);

  try {
    const addedEntry = patientServices.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default router;
