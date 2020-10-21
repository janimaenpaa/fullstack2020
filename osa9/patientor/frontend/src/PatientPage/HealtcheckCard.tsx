import React from "react";
import { HealthCheckEntry } from "../types";
import { Card, Icon, Header } from "semantic-ui-react";

const HealthCheckCard: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header content={entry.date} />
        <Card.Description content={entry.description} />
      </Card.Content>
    </Card>
  );
};

export default HealthCheckCard;
