import React from "react";

import { Entry, Diagnosis } from "../types";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

/*  return (
    <div>
      {entry.date} {entry.description}
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code}: {getDiagnosisName(code)}
            </li>
          ))}
      </ul>
    </div>
  );
}; */

export default EntryDetails;
