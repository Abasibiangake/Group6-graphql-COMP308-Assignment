import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import zwift from '../Zwift.jpg';
import fitXR from '../FitXR.avif';
import justDance from '../JustDanceNowLogo.jpeg';
const games = [
  {
    id: 1,
    name: 'Zwift',
    description: 'TOP TRAINING FROM THE COMFORT OF HOME',
    imageUrl: zwift,
    url:'https://us.zwift.com/'
  },
  {
    id: 2,
    name: 'fitXR',
    description: 'The FitXR app contains a growing range of fitness studios.',
    imageUrl: fitXR,
    url:'https://fitxr.com/'
  },
  {
    id: 3,
    name: 'Just Dance Now',
    description: 'lets you dance & follow the on-screen dancer\'s moves.',
    imageUrl: justDance,
    url:'https://justdancenow.com/'
  }
];

const FitnessGames = () => {
  const handleInstall = (game) => {
    console.log(`Installing ${game.name}`);
    window.open(game.url, '_blank');
    // Add logic to install the game or navigate to the app store page
  };

  return (
    <div className="container">
      <h1>Gaming Apps to Consider</h1>
      <Row>
        {games.map((game) => (
          <Col key={game.id} md={4}>
            <Card className="mb-4">
              <Card.Img className="card-img" variant="top" src={game.imageUrl}/>
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>{game.description}</Card.Text>
                <Button variant="primary" onClick={() => handleInstall(game)}>
                  Install
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FitnessGames;
