/** @format */

import diagnosesData from "../data/diagnoses";
import { diagnosesEntry } from "../types";

const diagnoses: diagnosesEntry[] = diagnosesData;

const getEntries = (): diagnosesEntry[] => {
  return diagnoses;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getEntries,
  addDiagnoses,
};
