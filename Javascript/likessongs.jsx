import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import '../CSS/likesongs.css';

const LikedSongs = ({ likedSongs }) => {
  return (
    <Container>
      <h1>Liked Songs</h1>
      <Row>
        {likedSongs.map((song, index) => (
          <Col key={index} lg={4} md={6} sm={12}>
            <Card className="mb-3">
              <Card.Img variant="top" src={song.image} alt="Song Album Art" />
              <Card.Body>
                <Card.Title>{song.songTitle}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{song.artistName}</Card.Subtitle>
                <Card.Text>
                  <strong>Album:</strong> {song.album}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LikedSongs;
