import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchSongs from './assets/components/SearchSongs'; 
import NavbarComponent from './assets/components/Navbar';
import LikedSongs from './assets/components/LikedSongs';

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<SearchSongs />} />
        <Route path="/search-songs" element={<SearchSongs />} />
        <Route path="/liked-songs" element={<LikedSongs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
