import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { updatePatient, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Gender, HealthCheckEntry, Patient } from "../types";
import { Button, Header, Icon } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

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

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find((p) => p.id === id);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      console.log(updatedPatient)
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      {Object.values(patient.entries).map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientPage;
