import patients from "../../data/patients";
import { NonSensitivePatient, Patient, NewPatient, Entry } from "../types";
import { v4 as uuidv4 } from "uuid";

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    ...entry,
    id: uuidv4(),
    entries: [] as Entry[],
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patient: Patient, newEntry: any): Patient => {
  const entryToAdd: Entry = {
    ...newEntry,
    id: uuidv4(),
  };

  patient.entries.push(entryToAdd);

  return patient;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((patient) => patient.id === id);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  addEntry,
  findById,
};
