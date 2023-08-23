/** @format */
import WorkIcon from "@mui/icons-material/Work";
import { BaseEntry, Diagnosis } from "../../types";

interface Props {
  entry: BaseEntry;
  entryDiagnosis: Diagnosis[];
}

function OccupationalEntry({ entry, entryDiagnosis }: Props) {
  return (
    <>
      <div>
        <p>
          {entry.date} <WorkIcon />
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

export default OccupationalEntry;
