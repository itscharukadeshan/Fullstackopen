/** @format */

import patientData from "../data/patients.json";
import {
  NonSensitivePatientData,
  PatientEntry,
  NewPatientEntry,
} from "../types";

import { v4 as uuidv4 } from "uuid";

const patients: PatientEntry[] = patientData;

const getEntries = (): PatientEntry[] => {
  return patients;
};
const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patientData.find((patient) => patient.id === id);
  return entry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitivePatientData,
  findById,
};
