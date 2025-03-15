import React, { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { AdminNavbar } from "../components/metadata";
import { getCategories } from "../helpers/api";

function AdminProjects() {
    const [categories, setCategories] = useState([]);

    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [version, setVersion] = useState("");
    const [description, setDescription] = useState("");
    const [dLink, setDLink] = useState("");
    const [storeLink, setStoreLink] = useState("");
    const [expLink, setExpLink] = useState("");

    useEffect(() => {
        getCategories()
            .then((data) => setCategories(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <AdminNavbar />

            <Container fluid="md" className="mt-5">
                {/* Form to add project */}
                <div className="about-heading text-center pt-3">
                    Add Project
                </div>
                <div className="underline" />
                <Container fluid="sm">
                    <Form method="post">
                        {/* Project Type */}
                        <FloatingLabel
                            controlId="projectType"
                            label="Project Type"
                            className="mb-3"
                        >
                            <Form.Select
                                placeholder="Project Type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                {categories.map((cat) => {
                                    return (
                                        <option
                                            key={cat["$id"]}
                                            value={cat["$id"]}
                                        >
                                            {cat.category_name}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        </FloatingLabel>

                        {/* Project Name */}
                        <FloatingLabel
                            controlId="projectName"
                            label="Enter Project Name"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Enter Project Name"
                                required
                                maxLength={50}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FloatingLabel>

                        {/* Project Version */}
                        <FloatingLabel
                            controlId="projectVer"
                            label="Enter Project Version"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Enter Project Version"
                                required
                                maxLength={15}
                                value={version}
                                onChange={(e) => setVersion(e.target.value)}
                            />
                        </FloatingLabel>

                        {/* Project Description */}
                        <FloatingLabel
                            controlId="projectDesc"
                            label="Enter Project Description"
                            className="mb-3"
                        >
                            <Form.Control
                                as={"textarea"}
                                rows={3}
                                type="text"
                                placeholder="Enter Project Description"
                                required
                                maxLength={200}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FloatingLabel>

                        {/* Project Download Link */}
                        <FloatingLabel
                            controlId="projectDlink"
                            label="Enter Project Download Link"
                            className="mb-3"
                        >
                            <Form.Control
                                type="url"
                                placeholder="Enter Project Download Link"
                                value={dLink}
                                onChange={(e) => setDLink(e.target.value)}
                            />
                        </FloatingLabel>

                        {/* Project App Store Link */}
                        <FloatingLabel
                            controlId="projectStorelink"
                            label="Enter App Store Link"
                            className="mb-3"
                        >
                            <Form.Control
                                type="url"
                                placeholder="Enter App Store Link"
                                value={storeLink}
                                onChange={(e) => setStoreLink(e.target.value)}
                            />
                        </FloatingLabel>

                        {/* Project Download Link */}
                        <FloatingLabel
                            controlId="projectExplink"
                            label="Enter Link to Explore Project"
                            className="mb-3"
                        >
                            <Form.Control
                                type="url"
                                placeholder="Enter Link to Explore Project"
                                value={expLink}
                                onChange={(e) => setExpLink(e.target.value)}
                            />
                        </FloatingLabel>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="btn btn-primary form-control"
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            Create Project
                        </Button>
                    </Form>
                </Container>
            </Container>
        </>
    );
}

export default AdminProjects;
