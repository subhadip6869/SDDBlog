import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router";
import "../../assets/admin_login.css";
import account from "../../helpers/appwrite_helper";

function AdminNavbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const user = await account.get();
                setUser(user);
            } catch (_) {
                setUser(null);
                navigate("/admin/login");
            }
        })();
    }, []);

    return (
        <Navbar expand="lg" data-bs-theme="dark" bg="primary" fixed="top">
            <Container fluid>
                <Navbar.Brand href="/">Admin Panel</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/admin" className="nav-link">
                            Profile
                        </NavLink>
                        <NavDropdown title="Works" id="basic-nav-dropdown">
                            <NavLink
                                to="/admin/projects"
                                className="dropdown-item"
                            >
                                Projects
                            </NavLink>
                        </NavDropdown>
                    </Nav>
                    <Button
                        onClick={async () => {
                            try {
                                await account.deleteSessions();
                                navigate("/admin/login");
                            } catch (e) {
                                alert("Something went wrong", e);
                            }
                        }}
                    >
                        {user?.name || user?.email || user?.phone || "User"} |
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminNavbar;
