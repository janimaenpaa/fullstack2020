import {
  NewPatient,
  Gender,
  NewEntry,
  Entry,
  NewBaseEntry,
  HealthCheckRating,
} from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }
  return name;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing SSN: " + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }
  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const isEntryType = (param: any): param is Entry => {
  const healthCheck: boolean = param === "HealthCheck";
  const occupationalHealthcare: boolean = param === "OccupationalHealthcare";
  const hospital: boolean = param === "Hospital";

  return healthCheck || occupationalHealthcare || hospital;
};

const parseEntryType = (entry: any): NewEntry => {
  if (!entry || !entry.type || !isEntryType(entry.type)) {
    throw new Error("Incorrect or missing type: " + entry);
  }
  return entry;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description: " + description);
  }
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist: " + specialist);
  }
  return specialist;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (rating === undefined || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing healtcheck rating: " + rating);
  }
  return rating;
};

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employer name: " + employerName);
  }
  return employerName;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const toNewPatienEntry = (object: any): NewPatient => {
  const newPatientEntry: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: object.entries || [],
  };

  return newPatientEntry;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const toNewEntry = (object: any): NewEntry => {
  const validEntry = parseEntryType(object);
  if (!validEntry) throw new Error("Entry is not valid!");

  const baseEntry: NewBaseEntry = {
    description: parseDescription(validEntry.description),
    date: parseDate(validEntry.date),
    specialist: parseSpecialist(validEntry.specialist),
    diagnosisCodes: validEntry.diagnosisCodes,
  };

  switch (validEntry.type) {
    case "HealthCheck":
      const healthCheckEntry = {
        ...baseEntry,
        type: validEntry.type,
        healthCheckRating: parseHealthCheckRating(validEntry.healthCheckRating),
      };
      return healthCheckEntry;
    case "Hospital":
      const hospitalEntry = {
        ...baseEntry,
        type: validEntry.type,
        discharge: validEntry.discharge,
      };
      return hospitalEntry;
    case "OccupationalHealthcare":
      const occupationalHealthcareEntry = {
        ...baseEntry,
        type: validEntry.type,
        employerName: parseEmployerName(validEntry.employerName),
        sickLeave: validEntry.sickLeave,
      };
      return occupationalHealthcareEntry;
    default:
      return assertNever(validEntry);
  }
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
