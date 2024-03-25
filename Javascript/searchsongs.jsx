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
import "/style/searchsong.css";
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
      const authParams = {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`,
      };
      
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", authParams);
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
  
      const response = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=1`, albumParameters);
      if (!response.ok) {
        throw new Error('Failed to retrieve song info');
      }
      const data = await response.json();
      const firstTrack = data.tracks.items[0];
      const updatedSongData = {
        image: firstTrack.album.images[0].url,
        album: firstTrack.album.name,
        songTitle: firstTrack.name,
        artistName: firstTrack.artists[0].name,
        artistInfo: firstTrack.artists[0].type,
        releaseDate: firstTrack.album.release_date,
      };
      setSongData(updatedSongData);
      setShowSongInfo(true);
    } catch (error) {
      console.error('Error fetching song info:', error);
      // Handle errors appropriately, maybe display an error message to the user
      alert('Error fetching song info: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = () => {
    setClick(!isClick);
    // Implement logic to add songData to favorites
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
