import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import {
    Button,
    Col,
    Container,
    Dropdown,
    Image,
    Row,
    Table,
} from "react-bootstrap";
import "../assets/App.css";
import { CustomProgressBar } from "../components";
import { CustomFooter, CustomNavbar } from "../components/metadata";
import { getInterests } from "../helpers/api";

function App() {
    const [interests, setInterests] = useState([]);

    const fetchInterests = async () => {
        try {
            const data = await getInterests();
            setInterests(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchInterests();
    }, []);

    return (
        <div className="wrapper">
            {/* Navigation bar */}
            <CustomNavbar />

            {/* background image section */}
            <Container fluid className="background-image">
                <Row className="myrow align-items-center">
                    <Col lg="4" className="imgdiv">
                        <Image
                            src="src/assets/images/photo.jpg"
                            alt="photo.jpg"
                            className="photo"
                        />
                    </Col>
                    <Col lg="8" className="text-light text-center">
                        <div className="welcome-text">Welcome,</div>
                        <div className="name">I'm Subhadip Dutta</div>
                        <div className="text-description">
                            Full-Stack Developer
                        </div>

                        {/* Dropdown contact button */}
                        <Dropdown>
                            <Dropdown.Toggle
                                as={Button}
                                className="link-btn fw-bold"
                            >
                                Contact Me!
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item
                                    href="https://telegram.me/subhadip6869"
                                    target="_blank"
                                >
                                    Telegram
                                </Dropdown.Item>
                                <Dropdown.Item href="mailto:subhadip.dutta@yahoo.com">
                                    Email
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Container>

            {/* About me section */}
            <Container fluid="lg" className="about-me mt-5 mb-5">
                <div className="about-heading text-center">
                    Know more about me!
                </div>
                <div className="underline"></div>

                <Row className="align-items-center justify-content-around gx-3 gy-1">
                    <Col lg="8" className="about-section">
                        <div className="description p-3">
                            <p>
                                I'm now studying in the Department of Computer
                                Science of Engineering in the University of
                                Kalyani. I'm a student of MCA (Master of
                                Computer Applications).
                            </p>
                            <p>
                                I've completed BCA (Bachelor of Computer
                                Application) from Institute of Computer and
                                Information Sciences (ICIS College) under the
                                Bankura University in the year 2021.
                            </p>
                            <p>
                                I have interest in Web Design and Development,
                                Android Development, Database Management.
                            </p>
                        </div>
                    </Col>

                    <Col lg="4" className="p-3">
                        <Table striped>
                            <tbody>
                                <tr>
                                    <td className="left">
                                        <i className="bi bi-person"></i> Name:
                                    </td>
                                    <td className="right">Subhadip Dutta</td>
                                </tr>
                                <tr>
                                    <td className="left">
                                        <i className="bi bi-envelope"></i>{" "}
                                        Email:
                                    </td>
                                    <td className="right">
                                        subhadip.dutta@yahoo.com
                                    </td>
                                </tr>
                                <tr>
                                    <td className="left">
                                        <i className="bi bi-geo-alt"></i> From:
                                    </td>
                                    <td className="right">
                                        Bankura, West Bengal
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

            <Container className="about-me mt-5 mb-5">
                <div className="about-heading text-center">My Interests</div>
                <div className="underline"></div>

                <Row className="align-items-center gx-3 gy-3">
                    {interests.map((intr) => (
                        <Col md="6" className="interests" key={intr.id}>
                            <div className="element">
                                <p className="fs-4 fw-bold">
                                    <i className={intr.intr_icon} />{" "}
                                    {intr.intr_title}
                                </p>
                                <p className="descr opacity-50">
                                    {intr.intr_desc}
                                </p>
                                <CustomProgressBar
                                    value={intr.skill_percent}
                                    label={`${intr.skill_percent}%`}
                                />
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

            <CustomFooter />
        </div>
    );
}

export default App;
