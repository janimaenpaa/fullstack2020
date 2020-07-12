import React from "react";

import { Entry } from "../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      {entry.date} {entry.description}
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)}
      </ul>
    </div>
  );
};

export default EntryDetails;
