import patients from "../../data/patients";

import { PatientEntry } from "../types";

const getPatients = (): PatientEntry[] => {
  return patients;
};

const addPatient = () => {
  return null;
};

const getNonSensitivePatients = (): Omit<PatientEntry, "ssn">[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getPatients, getNonSensitivePatients, addPatient };
