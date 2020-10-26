import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
export default function Home() {
  const history = useHistory();
  const logOut = (event) => {
    event.preventDefault();
    let path = `login`;
    history.push(path);
  };
  return (
    <Card>
      <Card.Header as='h4'>Welcome to React JS </Card.Header>
      <Card.Body>
        <Button onClick={logOut}>Logout</Button>
      </Card.Body>
    </Card>
  );
}
