/** @format */

import express from "express";
import patientServices from "../services/patientServices";

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
  const { ssn, name, dateOfBirth, gender, occupation } = req.body;

  const addedPatient = patientServices.addPatient({
    ssn,
    name,
    dateOfBirth,
    gender,
    occupation,
  });

  res.json(addedPatient);
});

export default router;
