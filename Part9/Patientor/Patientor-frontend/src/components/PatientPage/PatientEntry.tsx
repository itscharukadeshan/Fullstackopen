/** @format */
import { useState, useEffect } from "react";
import { BaseEntry, Diagnosis } from "../../types";
import { Card } from "@mui/material";
import diagnoseServices from "../../services/diagnoses";
import HospitalEntry from "./HospitalEntry";
import OccupationalEntry from "./OccupationalEntry";
import HealthCheckEntry from "./HealthCheckEntry";

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

  let entryComponent = null;

  switch (entry.type) {
    case "Hospital":
      entryComponent = (
        <HospitalEntry entry={entry} entryDiagnosis={entryDiagnosis} />
      );
      break;
    case "OccupationalHealthcare":
      entryComponent = (
        <OccupationalEntry entry={entry} entryDiagnosis={entryDiagnosis} />
      );
      break;
    case "HealthCheck":
      entryComponent = (
        <HealthCheckEntry entry={entry} entryDiagnosis={entryDiagnosis} />
      );
      break;
    default:
      entryComponent = <p>Unknown entry type</p>;
  }

  return (
    <Card
      style={{
        padding: "50px",
        border: "2px solid rgba(0, 0, 0, 0.3)",
        margin: "10px",
      }}>
      {entryComponent}
    </Card>
  );
}

export default PatientEntry;
