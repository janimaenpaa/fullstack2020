import React from "react";

import { useStateValue } from "../state";
import { Entry, Diagnosis } from "../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }, dispatch] = useStateValue();

  const getDiagnosisName = (code: string): string => {
    const codeNameNotFound = "";
    const diagnosis = Object.values(diagnoses).find(
      (d: Diagnosis) => d.code === code
    );
    if (diagnosis) {
      return diagnosis.name;
    }
    return codeNameNotFound;
  };

  return (
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
};

export default EntryDetails;
