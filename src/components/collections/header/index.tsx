import React from 'react';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';

const toggleFlag = false;
const Header = () => {
    return (
        <header className="header">
            <Navbar bg="light" expand={toggleFlag} className="mb-3">
                <Container fluid>
                    <Navbar.Toggle aria-controls={`lofiNavbar-expand-${toggleFlag}`} />
                    <Navbar.Brand href="/">Register Card Form</Navbar.Brand>
                    
                    <Navbar.Offcanvas
                        id={`lofiNavbar-expand-${toggleFlag}`}
                        aria-labelledby={`lofiNavbarLabel-expand-${toggleFlag}`}
                        placement="start"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`lofiNavbarLabel-expand-${toggleFlag}`}>
                                Menu
                        </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                This is menu content
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </header>
    );
};

export default Header;