import React from "react";

import { OccupationalHealthcareEntry } from "../types";

import { Card, Header, Icon } from "semantic-ui-react";

const OccupationalHealthcareDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <Card style={{ padding: "10px" }} fluid>
      <Card.Header>
        <Header as="h3">
          {entry.date} <Icon name="doctor" />
        </Header>
      </Card.Header>
      <Card.Meta>Specialist: {entry.specialist}</Card.Meta>
      <Card.Content>
        {entry.description} <br />
      </Card.Content>
      {entry.sickLeave && (
        <Card.Content>
          <b>Sick leave:</b> {entry.sickLeave.startDate} -{" "}
          {entry.sickLeave.endDate}
        </Card.Content>
      )}
    </Card>
  );
};

export default OccupationalHealthcareDetails;
