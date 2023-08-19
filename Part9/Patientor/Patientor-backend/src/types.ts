/** @format */

export type NonSensitivePatientData = Omit<PatientEntry, "ssn">;

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export interface diagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}
