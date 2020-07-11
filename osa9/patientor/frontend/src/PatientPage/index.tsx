import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { useStateValue, updatePatient } from "../state";
import { apiBaseUrl } from "../constants";

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find((p: Patient) => p.id === id);

  React.useEffect(() => {
    if (!patient || !patient.ssn) {
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(updatePatient(patientFromApi));
          console.log("tiikeri");
        } catch (e) {
          console.error(e);
        }
      };
      fetchPatient();
    }
  }, [id, patient, dispatch]);

  const patientGender = () => {
      switch (patient?.gender) {
          case "male":
              return (<Icon name="man"/>)
        case "female":
            return (<Icon name="woman"/>)
        default:
            return (<Icon name="genderless"/>)
      }
  }

  return (
    <div className="App">
      <h2>{patient?.name} {patientGender()}</h2>
      <p>
        ssn: {patient?.ssn} <br />
        occupation: {patient?.occupation}
      </p>
    </div>
  );
};

export default PatientPage;
