import patients from "../../data/patients";
import {
  NonSensitivePatientEntry,
  PatientEntry,
  NewPatientEntry,
} from "../types";
import { v4 as uuidv4 } from "uuid";

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find((patient) => patient.id === id);
  return entry;
};

export default { getEntries, getNonSensitiveEntries, addPatient, findById };
