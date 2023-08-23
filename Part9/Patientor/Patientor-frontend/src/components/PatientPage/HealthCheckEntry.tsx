/** @format */

/** @format */
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { BaseEntry, Diagnosis } from "../../types";

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

      <p>diagnoses by {entry.specialist}</p>
    </>
  );
}

export default HealthCheckEntry;
