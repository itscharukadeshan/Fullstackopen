/** @format */
import { useState, useEffect } from "react";
import { BaseEntry, Diagnosis } from "../../types";
import diagnoseServices from "../../services/diagnoses";
import HospitalEntry from "./HospitalEntry";
import OccupationalEntry from "./OccupationalEntry";

interface Props {
  entry: BaseEntry;
}

function PatientEntry({ entry }: Props) {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [entryDiagnosis, setEntryDiagnosis] = useState<any[]>([]);

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnosis = await diagnoseServices.getAll();
      setDiagnosis(diagnosis);

      if (entry.diagnosisCodes && entry.diagnosisCodes.length && diagnosis) {
        const entryDiagnoses = entry.diagnosisCodes.map((code) =>
          diagnosis.find((diagnosis) => diagnosis.code === code)
        );

        setEntryDiagnosis(entryDiagnoses);
      }
    };
    void fetchDiagnosisList();
  }, [entry]);

  return (
    <>
      <div>
        <p>{entry.date}</p>

        <p>{entry.description}</p>
      </div>
      {diagnosis && entryDiagnosis ? (
        <ul>
          {entryDiagnosis.map((diagnosis) => (
            <li key={diagnosis.code}>
              {diagnosis.code} - {diagnosis.name}
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
}

export default PatientEntry;
