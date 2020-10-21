import React from "react";
import { Entry } from "../types";
import { assertNever } from "../utils";
import HealthCheckCard from "./HealtcheckCard";
import HospitalCard from "./HospitalCard";
import OccupationalHealthcareCard from "./OccupationalHealtcareCard";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalCard entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareCard entry={entry} />;
    case "HealthCheck":
      return <HealthCheckCard entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
