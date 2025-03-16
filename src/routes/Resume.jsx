import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CustomProgressBar } from "../components";
import { CustomNavbar } from "../components/metadata";
import { getSkills } from "../helpers/api";

function Resume() {
    const [skills, setSkills] = useState([]);

    const fetchSkills = async () => {
        try {
            let data = await getSkills();
            setSkills(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    return (
        <div className="wrapper">
            <CustomNavbar />

            <Container fluid="md" className="mt-5">
                <div className="about-heading text-center pt-3">
                    Personal Details
                </div>
                <div className="underline"></div>
            </Container>

            <Container fluid="md" className="mt-5">
                <div className="about-heading text-center pt-3">
                    Computer Knowledges
                </div>
                <div className="underline"></div>
                <Row className="align-items-center gx-2 gy-2">
                    {skills.map((skill) => (
                        <Col sm="4" key={skill["$id"]}>
                            <div className="element interests px-3 py-1">
                                <p className="fs-5 fw-bold mb-1">
                                    {skill.name}
                                </p>
                                <p className="fs-6 mb-0">{skill.percent}%</p>
                                <CustomProgressBar
                                    value={skill.percent}
                                    progressStyle={{ height: "1ch" }}
                                />
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Resume;
