import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Card, Icon, Header } from "semantic-ui-react";

const OccupationalHealthcareCard: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header content={entry.date} />
        <Card.Description content={entry.description} />
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthcareCard;
