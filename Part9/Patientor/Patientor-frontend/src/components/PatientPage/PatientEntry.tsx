/** @format */
import { BaseEntry } from "../../types";

interface Props {
  entries: Array<BaseEntry>;
}

function PatientEntry({ entries }: Props) {
  return (
    <>
      <h3>entries</h3>

      {entries ? (
        <>
          {entries.map((entry) => (
            <>
              <p>{`${entry.date} ${entry.description} `}</p>
              <ul>
                {entry.diagnosisCodes?.map((diagnosisCode) => (
                  <li key={diagnosisCode}>{diagnosisCode}</li>
                ))}
              </ul>
            </>
          ))}
        </>
      ) : (
        <p>No patient entries</p>
      )}
    </>
  );
}

export default PatientEntry;
