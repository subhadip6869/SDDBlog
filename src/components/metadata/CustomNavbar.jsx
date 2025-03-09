import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "../../assets/nav.css";

const CustomNavbar = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetch("https://dsubha.netlify.app/api/projects/categories")
			.then((res) => res.json())
			.then((data) => setCategories(data))
			.catch((err) => {
				console.log(err);
			});
	});

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
									<NavDropdown.Item href={cat["$id"]}>
										{cat.category_name}
									</NavDropdown.Item>
								);
							})}
						</NavDropdown>
						<Nav.Link href="/admin-login">Admin</Nav.Link>
					</Nav>

					<Navbar.Text>
						<a href="#" target="_blank">
							<i className="bi bi-facebook"></i>
						</a>
						<a href="#" target="_blank">
							<i className="bi bi-instagram"></i>
						</a>
						<a href="#" target="_blank">
							<i className="bi bi-linkedin"></i>
						</a>
						<a href="#" target="_blank">
							<i className="bi bi-github"></i>
						</a>
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>

		// <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
		// 	<div className="container-fluid">
		// 		<h1 className="navbar-brand">Subhadip</h1>
		// 		<button
		// 			className="navbar-toggler"
		// 			type="button"
		// 			data-bs-toggle="collapse"
		// 			data-bs-target="#navbarText"
		// 			aria-controls="navbarText"
		// 			aria-expanded="false"
		// 			aria-label="Toggle navigation"
		// 		>
		// 			<span
		// 				className="navbar-toggler-icon"
		// 				id="navtoggle"
		// 				// onClick="navtoggle()"
		// 			></span>
		// 		</button>
		// 		<div className="collapse navbar-collapse" id="navbarText">
		// 			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
		// 				<li className="nav-item">
		// 					<a
		// 						className="nav-link"
		// 						id="home"
		// 						aria-current="page"
		// 						href="/"
		// 					>
		// 						Home
		// 					</a>
		// 				</li>
		// 				<li className="nav-item">
		// 					<a className="nav-link" id="resume" href="/resume">
		// 						Resume
		// 					</a>
		// 				</li>
		// 				<li className="nav-item dropdown">
		// 					<a
		// 						className="nav-link dropdown-toggle"
		// 						id="navbarDropdown"
		// 						role="button"
		// 						data-toggle="dropdown"
		// 						aria-haspopup="true"
		// 						aria-expanded="false"
		// 					>
		// 						My Works
		// 					</a>
		// 					{/* <div className="dropdown-menu" aria-labelledby="navbarDropdown">
		// 				{{#each work_data}}
		// 				<a className="dropdown-item" href="/works/{{this.work_slug}}">{{this.work_type}}</a>
		// 				{{/each}}
		// 			</div> */}
		// 				</li>
		// 				<li className="nav-item">
		// 					<a
		// 						className="nav-link"
		// 						id="resume"
		// 						href="/admin-login"
		// 					>
		// 						Admin
		// 					</a>
		// 				</li>
		// 			</ul>
		// 			<span className="navbar-text">
		// 				<a href="{{social_links.facebook}}" target="_blank">
		// 					<i className="bi bi-facebook"></i>
		// 				</a>
		// 				<a href="{{social_links.instagram}}" target="_blank">
		// 					<i className="bi bi-instagram"></i>
		// 				</a>
		// 				<a href="{{social_links.linkedin}}" target="_blank">
		// 					<i className="bi bi-linkedin"></i>
		// 				</a>
		// 				<a href="{{social_links.twitter}}" target="_blank">
		// 					<i className="bi bi-twitter"></i>
		// 				</a>
		// 			</span>
		// 		</div>
		// 	</div>
		// </nav>
	);
};

export default CustomNavbar;
