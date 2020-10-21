import React from "react";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { Card, Icon, Header } from "semantic-ui-react";

const getHeart = (rating: HealthCheckRating) => {
  switch (rating) {
    case 1:
      return <Icon name="heart" color="yellow" />;
    case 2:
      return <Icon name="heart" color="orange" />;
    case 3:
      return <Icon name="heart" color="red" />;
    default:
      return <Icon name="heart" color="green" />;
  }
};

const HealthCheckCard: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <Header as="h3">
            {entry.date} {<Icon name="doctor" />}
          </Header>
        </Card.Header>
        <Card.Description content={entry.description} />
        <Card.Description content={getHeart(entry.healthCheckRating)} />
      </Card.Content>
    </Card>
  );
};

export default HealthCheckCard;
