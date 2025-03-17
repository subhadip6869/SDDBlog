import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink, useParams } from "react-router";
import { CustomFooter, CustomNavbar } from "../components/metadata";
import { getCategories, getProjects } from "../helpers/api";

import "../assets/works.css";

function Works() {
    const { category } = useParams();

    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [category]);

    const fetchProjects = async () => {
        try {
            let data = await getProjects({ category_id: category });
            setProjects(data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchCategories = async () => {
        try {
            let data = await getCategories();
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="wrapper">
            <CustomNavbar />

            <Container fluid="md" className="projects-container">
                <div className="about-heading text-center mt-5 pt-3">
                    {categories.filter((c) => c["$id"] == category)[0]
                        ?.category_name || category}
                </div>
                <div className="underline"></div>

                <Row className="align-items-center gx-3 gy-3">
                    {projects.map((proj) => {
                        return (
                            <Col sm={12} md={6} lg={4} key={proj["$id"]}>
                                <div className="element project-container">
                                    <p className="fw-bold fs-4 px-1 mb-1">
                                        {proj.project_name}
                                    </p>
                                    <p className="opacity-50 mb-1">
                                        Version: {proj.project_version}
                                    </p>
                                    <p className="mb-1">{proj.project_desc}</p>
                                    <div className="d-flex gap-2 flex-wrap">
                                        {proj.project_link ? (
                                            <NavLink
                                                to={proj.project_link}
                                                className="btn link-btn px-2 py-1"
                                                target="_blank"
                                            >
                                                Download{" "}
                                                <i className="bi bi-cloud-arrow-down-fill"></i>
                                            </NavLink>
                                        ) : (
                                            <></>
                                        )}
                                        {proj.project_link_play ? (
                                            <NavLink
                                                to={proj.project_link_play}
                                                className="btn link-btn px-2 py-1"
                                                target="_blank"
                                            >
                                                App Store{" "}
                                                <i className="fa-brands fa-google-play"></i>
                                            </NavLink>
                                        ) : (
                                            <></>
                                        )}
                                        {proj.project_explore ? (
                                            <NavLink
                                                to={proj.project_explore}
                                                className="btn link-btn px-2 py-1"
                                                target="_blank"
                                            >
                                                Explore{" "}
                                                <i className="bi bi-box-arrow-up-right"></i>
                                            </NavLink>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </Container>

            <CustomFooter />
        </div>
    );
}

export default Works;
