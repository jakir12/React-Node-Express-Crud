import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../assets/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">NPoly</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/add-contact">Add Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default Header