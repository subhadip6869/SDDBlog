import React, { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import "../../assets/admin_login.css";
import { CustomNavbar } from "../../components/metadata";
import account from "../../helpers/appwrite_helper";

const AdminLogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const user = await account.get();
                if (user) {
                    navigate("/admin");
                }
            } catch (_) {
                navigate("/admin/login");
            }
        })();
    }, []);

    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

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
                                if (loading) return;
                                setErrorMsg("");
                                setLoading(true);
                                try {
                                    await account.createEmailPasswordSession(
                                        email,
                                        password
                                    );
                                    navigate("/admin");
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
