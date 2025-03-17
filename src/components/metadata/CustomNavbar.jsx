import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router";
import "../../assets/main.css";
import "../../assets/nav.css";

const CustomNavbar = ({ categories = [] }) => {
    return (
        <Navbar expand="lg" data-bs-theme="dark" bg="dark" fixed="top">
            <Container fluid>
                <Navbar.Brand href="/">Subhadip</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/resume" className="nav-link">
                            Resume
                        </NavLink>
                        <NavDropdown title="Works" id="basic-nav-dropdown">
                            {categories.map((cat) => {
                                return (
                                    <NavLink
                                        className="dropdown-item"
                                        to={"/works/" + cat["$id"]}
                                        key={cat["$id"]}
                                    >
                                        {cat.category_name}
                                    </NavLink>
                                );
                            })}
                        </NavDropdown>
                        <NavLink to="/admin/login" className="nav-link">
                            Admin
                        </NavLink>
                    </Nav>

                    <Navbar.Text>
                        <NavLink
                            to="https://www.facebook.com/subhadip6869"
                            target="_blank"
                        >
                            <i className="bi bi-facebook"></i>
                        </NavLink>
                        <NavLink
                            to="https://www.instagram.com/subhadip6869/"
                            target="_blank"
                        >
                            <i className="bi bi-instagram"></i>
                        </NavLink>
                        <NavLink
                            to="https://www.linkedin.com/in/subhadip6869/"
                            target="_blank"
                        >
                            <i className="bi bi-linkedin"></i>
                        </NavLink>
                        <NavLink
                            to="https://github.com/subhadip6869/"
                            target="_blank"
                        >
                            <i className="bi bi-github"></i>
                        </NavLink>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
