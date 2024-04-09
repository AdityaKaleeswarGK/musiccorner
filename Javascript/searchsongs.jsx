import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Heart from "react-animated-heart";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
} from 'react-bootstrap';
import "./style/searchsong.css"; 
const SPOTIFY_CLIENT_ID = '0e18c9180b0640a180448e9d69bd8d62';
const SPOTIFY_CLIENT_SECRET = 'dce548cdbd7b4d35808dc220e6db2980';
function SearchSongs() {
  const [isClick, setClick] = useState(false);  
  const [searchQuery, setSearchQuery] = useState('');
  const [showSongInfo, setShowSongInfo] = useState(false);
  const [accesstoken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [songData, setSongData] = useState({
    image: '', 
    album: '',
    songTitle: '',
    artistName: '',
    artistInfo: '',
    releaseDate: '',
  });

  useEffect(() => {
    async function fetchAccessToken() {
      const authParams = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET,
      });
      
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          body: authParams,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch access token');
        }

        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    }

    fetchAccessToken();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const albumParameters = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accesstoken
        }
      };
      const data = await response.json();
      if (!data || !data.tracks || !data.tracks.items || data.tracks.items.length === 0) {
        throw new Error('No track found');
      }
      const firstTrack = data.tracks.items[0];
      if (!firstTrack.album || !firstTrack.artists || firstTrack.artists.length === 0) {
        throw new Error('Invalid track data');
      }
      const artistName = firstTrack.artists[0].name; 
      const updatedSongData = {
        image: firstTrack.album.images[0].url,
        album: firstTrack.album.name,
        songTitle: firstTrack.name,
        artistName: artistName,
        artistInfo: artistType,
        releaseDate: firstTrack.album.release_date,
      };

      setSongData(updatedSongData);
      setShowSongInfo(true);
    } catch (error) {
      console.error('Error fetching song info:', error);
      alert('Error fetching song info: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  const { Pool } = require('pg');
  const pool = new Pool({
  user: 'aditya',
  host: 'localhost',
  database: 'musiccorner',
  password: 'Applegk04!!',
  port: 5432,
});
const handleAddToFavorites = async () => {
  try {
    const query = `
      INSERT INTO favorites (artistName, songTitle, album)
      VALUES ($1, $2, $3)
    `;
    const values = [songData.artistName, songData.songTitle, songData.album];
    await pool.query(query, values);
    alert('Song added to favorites!');
    setClick(!isClick);
  } catch (error) {
    console.error('Error adding to favorites:', error);
    alert('Error adding to favorites: ' + error.message);
  }
};
  return (
    <Container>
      <div className='he'>Music Corner</div>
      <InputGroup className="mb-3">
        <FormControl
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search for Song"
        />
        <Button variant="outline-secondary" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup>

      {loading && <p>Loading...</p>}

      {showSongInfo && ( 
        <Container className="mt-3">
          <Card>
            <CardImg top src={songData.image} alt="Song Album Art" />
            <CardBody>
              <CardTitle>{songData.songTitle}</CardTitle>
              <CardSubtitle>{songData.album}</CardSubtitle>
              <CardSubtitle>{songData.artistName}</CardSubtitle>
              <CardSubtitle>{songData.artistInfo}</CardSubtitle>
              <CardSubtitle>{songData.releaseDate}</CardSubtitle>
              <Row className="justify-content-between mt-3">
                <Col>
                  <Button variant="primary">Lyrics</Button>
                </Col>
                <Col>
                  <Heart 
                    isClick={isClick} 
                    onClick={handleAddToFavorites}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      )}
    </Container>
  );
}
export default SearchSongs;

