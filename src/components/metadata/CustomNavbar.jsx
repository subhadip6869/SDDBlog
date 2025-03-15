import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "../../assets/nav.css";
import { getCategories } from "../../helpers/api";

const CustomNavbar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then((data) => setCategories(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <Navbar expand="lg" data-bs-theme="dark" bg="dark" fixed="top">
            <Container fluid>
                <Navbar.Brand href="/">Subhadip</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/resume">Resume</Nav.Link>
                        <NavDropdown title="Works" id="basic-nav-dropdown">
                            {categories.map((cat) => {
                                return (
                                    <NavDropdown.Item
                                        href={cat["$id"]}
                                        key={cat["$id"]}
                                    >
                                        {cat.category_name}
                                    </NavDropdown.Item>
                                );
                            })}
                        </NavDropdown>
                        <Nav.Link href="/admin-login">Admin</Nav.Link>
                    </Nav>

                    <Navbar.Text>
                        <a
                            href="https://www.facebook.com/subhadip6869"
                            target="_blank"
                        >
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a
                            href="https://www.instagram.com/subhadip6869/"
                            target="_blank"
                        >
                            <i className="bi bi-instagram"></i>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/subhadip6869/"
                            target="_blank"
                        >
                            <i className="bi bi-linkedin"></i>
                        </a>
                        <a
                            href="https://github.com/subhadip6869/"
                            target="_blank"
                        >
                            <i className="bi bi-github"></i>
                        </a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
