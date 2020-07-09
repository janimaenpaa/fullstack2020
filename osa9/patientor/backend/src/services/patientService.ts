import { v4 as uuidv4 } from "uuid";
import patients from "../../data/patients";

import { PatientEntry, NewPatientEntry } from "../types";

const getPatients = (): PatientEntry[] => {
  return patients;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatientEntry);
  console.log(newPatientEntry);
  return newPatientEntry;
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
