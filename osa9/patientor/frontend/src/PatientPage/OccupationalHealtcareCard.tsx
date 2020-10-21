import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Card, Icon, Header } from "semantic-ui-react";

const OccupationalHealthcareCard: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <Header as="h3">
            {entry.date} {<Icon name="stethoscope" />} {entry.employerName}
          </Header>
        </Card.Header>
        <Card.Description content={entry.description} />
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthcareCard;
