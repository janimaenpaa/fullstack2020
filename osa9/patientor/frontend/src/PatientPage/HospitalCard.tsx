import React from "react";
import { HospitalEntry } from "../types";
import { Card, Icon, Header } from "semantic-ui-react";

const HospitalCard: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header content={entry.date} />
        <Card.Description content={entry.description} />
      </Card.Content>
    </Card>
  );
};

export default HospitalCard;
