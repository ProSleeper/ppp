import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Header = () => {
    return (
        <header>
            <Navbar bg="light" className="justify-content-center">
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                {/* <Navbar.Collapse id="basic-navbar-nav"> */}
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/" className="btn btn-secondary">
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/addurl" className="btn btn-secondary">
                        AddUrl
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Urls" className="btn btn-warning">
                        Urls
                    </Nav.Link>
                </Nav>
                {/* </Navbar.Collapse> */}
            </Navbar>
        </header>
    );
};

export default Header;
