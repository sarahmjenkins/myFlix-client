import React from 'react';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import './navbar.scss';

export function NavBar() {
  
  const user = localStorage.getItem('user');
  
  const isAuth = () => {
    if(typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };
  
  return(
    <Navbar fluid="md" bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">myFlix by Sarah</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav>
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
            )}
            {isAuth() && (
              <Button variant="link" onClick={() => {onLoggedOut()}}>Sign Out</Button>
            )}
            {!isAuth() && (
              <Nav.Link href="/">Sign In</Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link href="/register">Sign Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}