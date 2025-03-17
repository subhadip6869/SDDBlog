import React, { useEffect, useState } from "react";
import {
    Button,
    Container,
    FloatingLabel,
    Form,
    Modal,
    Table,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import AdminTemplate from "../../components/AdminTemplate";
import {
    addProject,
    deleteProject,
    getCategories,
    getProjects,
    updateProject,
} from "../../helpers/api";
import account from "../../helpers/appwrite_helper";

function AdminProjects() {
    const [categories, setCategories] = useState([]);
    const [projects, setProjects] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [validated, setValidated] = useState(false);
    const [saving, setSaving] = useState(false);

    const [id, setId] = useState("");
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [version, setVersion] = useState("");
    const [description, setDescription] = useState("");
    const [dLink, setDLink] = useState("");
    const [storeLink, setStoreLink] = useState("");
    const [expLink, setExpLink] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getCategories()
            .then((data) => {
                setCategories(data);
                if (data.length > 0) setType(data[0]["$id"]);
            })
            .catch((err) => console.log(err));
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setProjects(await getProjects());
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (saving) return;
        setValidated(true);
        if (!e.currentTarget.parentElement.checkValidity()) return;
        setSaving(true);
        let jwt = (await account.createJWT()).jwt;
        try {
            let data;
            // if id is set, it means this is an update
            if (id) {
                data = await updateProject({
                    id,
                    type,
                    name,
                    version,
                    description,
                    dLink,
                    storeLink,
                    expLink,
                    signature: jwt,
                });
            }
            // else it's a new project
            else {
                data = await addProject({
                    type,
                    name,
                    version,
                    description,
                    dLink,
                    storeLink,
                    expLink,
                    signature: jwt,
                });
            }

            // show error message else reset the fields
            if (data.code !== 200) {
                setModalMessage(data.error);
                setShowModal(true);
            } else {
                fetchProjects();
                setId("");
                setName("");
                setVersion("");
                setDescription("");
                setDLink("");
                setStoreLink("");
                setExpLink("");
                setValidated(false);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (saving) return;
        if (confirm("Are you sure you want to delete this project?")) {
            setSaving(true);
            let jwt = (await account.createJWT()).jwt;
            try {
                let data = await deleteProject({ id, signature: jwt });
                if (data.code !== 200) {
                    setModalMessage(data.error);
                    setShowModal(true);
                } else {
                    fetchProjects();
                }
            } catch (err) {
                console.log(err);
            } finally {
                setSaving(false);
            }
        }
    };

    const populateEditProject = (proj) => {
        setId(proj["$id"]);
        setType(proj.project_categories["$id"]);
        setName(proj.project_name);
        setVersion(proj.project_version);
        setDescription(proj.project_desc);
        setDLink(proj.project_link || "");
        setStoreLink(proj.project_link_play || "");
        setExpLink(proj.project_explore || "");
        document
            .getElementById("projectForm")
            .scrollIntoView({ behavior: "smooth" });
    };

    const generateProjectRows = () => {
        return projects.map((proj) => (
            <tr key={proj["$id"]}>
                <td>{proj.project_categories.category_name}</td>
                <td>{proj.project_name}</td>
                <td>{proj.project_version}</td>
                <td className="text-center">
                    {proj.project_link ? (
                        <a target="_blank" href={proj.project_link}>
                            <i className="bi bi-download"></i>
                        </a>
                    ) : (
                        "-"
                    )}
                </td>
                <td className="text-center">
                    {proj.project_link_play ? (
                        <a target="_blank" href={proj.project_link_play}>
                            <i className="bi bi-google-play"></i>
                        </a>
                    ) : (
                        "-"
                    )}
                </td>
                <td className="text-center">
                    {proj.project_explore ? (
                        <a target="_blank" href={proj.project_explore}>
                            <i className="bi bi-box-arrow-up-right"></i>
                        </a>
                    ) : (
                        "-"
                    )}
                </td>
                <td className="text-center">
                    <a
                        href=""
                        onClick={(e) => {
                            e.preventDefault();
                            populateEditProject(proj);
                        }}
                    >
                        <i className="bi bi-pencil-square"></i>
                    </a>
                </td>
                <td className="text-center">
                    <a
                        href=""
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete(proj["$id"]);
                        }}
                    >
                        <i className="bi bi-trash"></i>
                    </a>
                </td>
            </tr>
        ));
    };

    return (
        <AdminTemplate>
            {/* Modal to show error message */}
            <Modal
                show={showModal}
                onHide={() => {
                    setModalMessage("");
                    setShowModal(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Save data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{modalMessage}</p>
                </Modal.Body>
            </Modal>

            {/* Main content */}
            <Container fluid="md" className="mt-5">
                {/* Form to add project */}
                <div
                    className="about-heading text-center pt-3"
                    id="projectForm"
                >
                    Add Project
                </div>
                <div className="underline" />
                <Container fluid="sm">
                    <Form method="post" noValidate validated={validated}>
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
                            <Form.Control.Feedback type="invalid">
                                Please select a project type.
                            </Form.Control.Feedback>
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
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid project name.
                            </Form.Control.Feedback>
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
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid project version.
                            </Form.Control.Feedback>
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
                                maxLength={300}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a project description.
                            </Form.Control.Feedback>
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
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid download link.
                            </Form.Control.Feedback>
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
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid app store link.
                            </Form.Control.Feedback>
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
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid explore link.
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        {/* Submit Button */}
                        <Button
                            variant="success"
                            type="submit"
                            className="btn btn-primary form-control"
                            onClick={(e) => handleSubmit(e)}
                        >
                            {saving ? (
                                <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                    style={{ borderWidth: "2px" }}
                                />
                            ) : id ? (
                                "Update Project"
                            ) : (
                                "Create Project"
                            )}
                        </Button>
                    </Form>
                </Container>

                {/* List Available Projects */}
                <div className="about-heading text-center pt-3">
                    Available Projects
                </div>
                <div className="underline" />
                <Container fluid="sm">
                    {projects.length > 0 ? (
                        <Table striped bordered>
                            {/* Project table header */}
                            <thead className="table-danger">
                                <tr className="text-center">
                                    <th>Category</th>
                                    <th>Name</th>
                                    <th>Version</th>
                                    <th>Download</th>
                                    <th>App Store</th>
                                    <th>Explore</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            {/* Project Table Contents */}
                            <tbody>{generateProjectRows()}</tbody>
                        </Table>
                    ) : (
                        <div className="text-center">No Projects Found</div>
                    )}
                </Container>
            </Container>
        </AdminTemplate>
    );
}

export default AdminProjects;
