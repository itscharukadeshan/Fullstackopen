/** @format */
import { useState, useEffect } from "react";
import { BaseEntry, Diagnosis } from "../../types";
import diagnoseServices from "../../services/diagnoses";

interface Props {
  entries: Array<BaseEntry>;
}

function PatientEntry({ entries }: Props) {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [entryDiagnoses, setEntryDiagnoses] = useState<any[]>([]);

  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnoseServices.getAll();

      if (entries && diagnoses) {
        const entryDiagnoses = entries.map((entry) => {
          return entry.diagnosisCodes?.map((code) => {
            return diagnoses.find((diagnosis) => diagnosis.code === code);
          });
        });

        const flattenedDiagnoses = entryDiagnoses.flat();

        setEntryDiagnoses(flattenedDiagnoses);
      }

      setDiagnoses(diagnoses);
    };

    void fetchDiagnosesList();
  }, [entries]);

  return (
    <>
      <h3>entries</h3>

      {entries ? (
        <>
          <p>
            {entries.map((entry) => (
              <>
                <>{`${entry.date} ${entry.description} `}</>
              </>
            ))}
          </p>

          {entryDiagnoses ? (
            <ul>
              {entryDiagnoses.map((diagnose) => (
                <li key={diagnose.code}>
                  {diagnose.code} {diagnose.name}
                </li>
              ))}
            </ul>
          ) : (
            <>no diagnose found </>
          )}
        </>
      ) : (
        <p>No patient entries</p>
      )}
    </>
  );
}

export default PatientEntry;
