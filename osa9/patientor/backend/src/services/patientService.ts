import { v4 as uuidv4 } from "uuid";
import patients from "../../data/patients";

import { Patient, NewPatient, PublicPatient } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatientEntry);
  console.log(newPatientEntry);
  return newPatientEntry;
};

const getNonSensitivePatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient => {
  const patient = patients
    .filter((patient) => patient.id === id)[0];
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById,
};
