import React from "react";
import { HospitalEntry } from "../types";
import { Card, Icon, Header } from "semantic-ui-react";

const HospitalCard: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <Header as="h3">
            {entry.date} {<Icon name="hospital" />}
          </Header>
        </Card.Header>
        <Card.Description content={entry.description} />
      </Card.Content>
    </Card>
  );
};

export default HospitalCard;
