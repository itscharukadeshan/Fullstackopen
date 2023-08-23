/** @format */
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { BaseEntry, Diagnosis } from "../../types";
import HealthCheckRating from "./HealthCheckRating";

interface Props {
  entry: BaseEntry;
  entryDiagnosis: Diagnosis[];
}

function HospitalEntry({ entry, entryDiagnosis }: Props) {
  return (
    <>
      <div>
        <p>
          {entry.date} <MedicalServicesIcon />
        </p>
        <p>{entry.description}</p>
      </div>
      {entryDiagnosis ? (
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
      {entry.healthCheckRating ? (
        <HealthCheckRating rating={entry.healthCheckRating} />
      ) : (
        <></>
      )}

      <p>diagnoses by {entry.specialist}</p>
    </>
  );
}

export default HospitalEntry;
