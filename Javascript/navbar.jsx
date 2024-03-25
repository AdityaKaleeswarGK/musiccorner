import React, { useState } from 'react';
import { Nav, Navbar, Container, NavItem, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

const NavbarComponent = () => {
  const [activeTab, setActiveTab] = useState('search-songs');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-animated">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Music Corner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavItem>
              <NavLink
                as={Link}
                to="/search-songs"
                active={activeTab === 'search-songs'}
                onClick={() => handleTabClick('search-songs')}
              >
                Search Songs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                as={Link}
                to="/liked-songs"
                active={activeTab === 'liked-songs'}
                onClick={() => handleTabClick('liked-songs')}
              >
                Liked Songs
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
