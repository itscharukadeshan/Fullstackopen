/** @format */

import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "@mui/material";

import { Patient } from "../../types";

import PatientEntry from "./PatientEntry";
import GenderIcon from "./GenderIcon";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    axios
      .get<Patient>(`http://localhost:3001/api/patients/${id}`)
      .then((response) => {
        setPatient(response.data);
      });
  }, [id]);

  return (
    <div>
      {patient ? (
        <>
          <Card style={{ margin: "50px 0 0 0" }}>
            <div style={{ padding: "50px" }}>
              <h2>
                {patient.name}
                <GenderIcon gender={patient.gender} />
              </h2>
              <div>Ssn: {patient.ssn}</div>
              <div>Occupation : {patient.occupation}</div>
            </div>
            <div style={{ margin: "20px 50px 50px 50px" }}>
              {patient.entries ? (
                <>
                  <h3>entries</h3>
                  {patient.entries.map((entry) => (
                    <PatientEntry entry={entry} />
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
          </Card>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default PatientPage;
