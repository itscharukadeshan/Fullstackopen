/** @format */

export type NonSensitivePatientData = Omit<PatientEntry, "ssn">;
export type NewPatientEntry = Omit<PatientEntry, "id">;

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

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
