import { Account, Client } from "appwrite";
import React, { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import "../assets/admin_login.css";
import { CustomNavbar } from "../components/metadata";

const AdminLogin = () => {
	const [errorMsg, setErrorMsg] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const client = new Client();
	client
		.setEndpoint("https://cloud.appwrite.io/v1")
		.setProject("676ba6a1000d19be09ab");
	const account = new Account(client);

	return (
		<div className="wrapper">
			<CustomNavbar />

			<Container fluid="md" className="mt-5 login-container">
				<div className="about-heading text-center">
					Admin Panel Login
				</div>
				<div className="underline"></div>

				<Container fluid="sm">
					<Form method="post">
						<InputGroup className="mb-3">
							<InputGroup.Text
								as={"span"}
								style={{ backgroundColor: "#dddddd" }}
							>
								@
							</InputGroup.Text>
							<Form.Control
								type="email"
								placeholder="Username"
								required
								id="username"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</InputGroup>
						<InputGroup className="mb-3">
							<InputGroup.Text
								as={"span"}
								style={{ backgroundColor: "#dddddd" }}
							>
								#
							</InputGroup.Text>
							<Form.Control
								type="password"
								placeholder="Password"
								required
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</InputGroup>

						<Button
							type="submit"
							className="btn btn-success form-control"
							value="Login"
							onClick={async (e) => {
								e.preventDefault();
								setErrorMsg("");
								setLoading(true);
								try {
									try {
										await account.deleteSessions();
									} catch (_) {}
									await account.createEmailPasswordSession(
										email,
										password
									);
									let user = await account.createJWT();
									sessionStorage.setItem("token", user.jwt);
									alert(user.jwt);
								} catch (error) {
									setErrorMsg(error.message);
								} finally {
									setLoading(false);
								}
							}}
						>
							{loading ? (
								<span
									className="spinner-border spinner-border-sm"
									role="status"
									aria-hidden="true"
									style={{ borderWidth: "2px" }}
								/> // Bootstrap spinner
							) : (
								"Login"
							)}
						</Button>

						<div className="mt-3 errormessage">
							<center>{errorMsg}</center>
						</div>
					</Form>
				</Container>
			</Container>
		</div>
	);
};

export default AdminLogin;
