/** @format */

import patientData from "../data/patients.json";
import { NonSensitivePatientData, PatientEntry } from "../types";

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

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  addPatient,
  getNonSensitivePatientData,
};
