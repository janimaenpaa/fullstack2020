import React from "react";

import { HospitalEntry } from "../types";

import { Card, Header, Icon, CardContent } from "semantic-ui-react";

interface Props {}

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({
  entry,
}) => {
  return (
    <Card style={{ padding: "10px" }} fluid>
      <Card.Header>
        <Header as="h3">
          {entry.date} <Icon name="hospital" />
        </Header>
      </Card.Header>
      <Card.Meta>Specialist: {entry.specialist}</Card.Meta>
      <Card.Content>
        {entry.description}
      </Card.Content>
      <Header as="h4">Discharge</Header>
      <Card.Content>
        Date: {entry.discharge.date} <br />
        Criteria: {entry.discharge.criteria}
      </Card.Content>
    </Card>
  );
};

export default HospitalEntryDetails;
