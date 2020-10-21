import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { updatePatient, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Gender, Patient } from "../types";
import { Header, Icon } from "semantic-ui-react";

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find((p) => p.id === id);

  useEffect(() => {
    if (!patient || !patient.ssn) {
      const fetchPatient = async () => {
        try {
          const { data } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          console.log(data);
          dispatch(updatePatient(data));
        } catch (e) {
          console.error(e);
        }
      };

      fetchPatient();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case "male":
        return <Icon name="man" />;
      case "female":
        return <Icon name="woman" />;
      default:
        return <Icon name="genderless" />;
    }
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div className="App">
      <Header as="h2">
        {patient.name} {getGenderIcon(patient.gender)}
      </Header>
      <p>
        ssn: {patient.ssn} <br />
        occupation: {patient.occupation}
      </p>
      <Header as="h3">entries</Header>
      {Object.values(patient.entries).map((entry) => (
        <div key={entry.id}>
          {entry.date}{" "}
          <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code, index) => (
              <li key={index}>{code}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
