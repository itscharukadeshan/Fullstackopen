/** @format */

/** @format */
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { BaseEntry, Diagnosis } from "../../types";
import HealthCheckRating from "./HealthCheckRating";

interface Props {
  entry: BaseEntry;
  entryDiagnosis: Diagnosis[];
}

function HealthCheckEntry({ entry, entryDiagnosis }: Props) {
  return (
    <>
      <div>
        <p>
          {entry.date} <WorkHistoryIcon />
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

      <HealthCheckRating rating={entry.healthCheckRating} />

      <p>diagnoses by {entry.specialist}</p>
    </>
  );
}

export default HealthCheckEntry;
