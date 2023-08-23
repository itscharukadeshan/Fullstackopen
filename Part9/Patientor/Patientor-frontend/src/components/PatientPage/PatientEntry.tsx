/** @format */
import { useState, useEffect } from "react";
import { BaseEntry, Diagnosis } from "../../types";
import diagnoseServices from "../../services/diagnoses";

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
      <p>
        {entry.date}
        {"  "}
        {entry.description}
      </p>
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
