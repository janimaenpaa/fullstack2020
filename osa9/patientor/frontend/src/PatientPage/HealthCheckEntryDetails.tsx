import React from "react";

import { HealthCheckEntry } from "../types";

import { Card, Header, Icon } from "semantic-ui-react";

interface Props {}

const HospitalCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  return (
    <Card style={{ padding: "10px" }} fluid>
      <Card.Header>
        <Header as="h3">
          {entry.date} <Icon name="stethoscope" />
        </Header>
      </Card.Header>
      <Card.Meta>Specialist: {entry.specialist}</Card.Meta>
      <Card.Content>
        {entry.description} <br />
      </Card.Content>
    </Card>
  );
};

export default HospitalCheckDetails;
