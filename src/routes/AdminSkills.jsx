import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import "../assets/admin_login.css";
import { AdminNavbar } from "../components/metadata";
import { addSkill, deleteSkill, getSkills, updateSkill } from "../helpers/api";
import account from "../helpers/appwrite_helper";

function AdminSkills() {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [validated, setValidated] = useState(false);
    const [saving, setSaving] = useState(false);

    const [skills, setSkills] = useState([]);

    const [skillId, setSkillId] = useState("");
    const [skillName, setSkillName] = useState("");
    const [skillPercent, setSkillPercent] = useState(100);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (saving) return;
        setValidated(true);
        if (!e.currentTarget.parentElement.checkValidity()) return;
        setSaving(true);
        try {
            let jwt = (await account.createJWT()).jwt;
            let data;
            // if id is set, it means this is an update
            if (skillId) {
                data = await updateSkill({
                    id: skillId,
                    name: skillName,
                    percent: skillPercent,
                    signature: jwt,
                });
            }
            // else it's a new skill
            else {
                data = await addSkill({
                    name: skillName,
                    percent: skillPercent,
                    signature: jwt,
                });
            }
            // handle response
            if (data.code !== 200) {
                setModalMessage(data.error);
                setShowModal(true);
            } else {
                fetchSkills();
                setSkillId("");
                setSkillName("");
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
        if (confirm("Are you sure you want to delete this skill?")) {
            setSaving(true);
            let jwt = (await account.createJWT()).jwt;
            try {
                let data = await deleteSkill({ id, signature: jwt });
                if (data.code !== 200) {
                    setModalMessage(data.error);
                    setShowModal(true);
                } else {
                    fetchSkills();
                }
            } catch (err) {
                console.log(err);
            } finally {
                setSaving(false);
            }
        }
    };

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

    const generateSkillRows = () => {
        return skills.map((skill) => (
            <tr key={skill["$id"]}>
                <td>{skill["name"]}</td>
                <td>{skill["percent"]}%</td>
                <td className="text-center">
                    <a
                        href=""
                        onClick={(e) => {
                            e.preventDefault();
                            populateEdit(skill);
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
                            handleDelete(skill["$id"]);
                        }}
                    >
                        <i className="bi bi-trash"></i>
                    </a>
                </td>
            </tr>
        ));
    };

    const populateEdit = (proj) => {
        setSkillId(proj["$id"]);
        setSkillName(proj["name"]);
        setSkillPercent(proj["percent"]);
        document.getElementById("form").scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* Admin Navbar */}
            <AdminNavbar />

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
                <div className="about-heading text-center pt-3" id="form">
                    Add Skills
                </div>
                <div className="underline" />

                <Container fluid="sm">
                    <Form method="post" noValidate validated={validated}>
                        <Form.Group className="mb-3" controlId="skillName">
                            <Form.Label>Skill</Form.Label>
                            <Form.Control
                                type="text"
                                name="skillName"
                                maxLength={30}
                                required
                                value={skillName}
                                onChange={(e) => setSkillName(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter skill name.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="skillPercent">
                            <Form.Label>Percent: {skillPercent}%</Form.Label>
                            <Form.Range
                                max={100}
                                min={10}
                                step={1}
                                value={skillPercent}
                                onChange={(e) =>
                                    setSkillPercent(e.target.value)
                                }
                                name="skillName"
                                required
                            />
                        </Form.Group>

                        <Button
                            variant="success"
                            type="submit"
                            className="btn btn-primary form-control"
                            onClick={handleSubmit}
                        >
                            {saving ? (
                                <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                    style={{ borderWidth: "2px" }}
                                />
                            ) : skillId ? (
                                "Update"
                            ) : (
                                "Create"
                            )}
                        </Button>
                    </Form>
                </Container>

                {/* List Available Projects */}
                <div className="about-heading text-center pt-3">
                    Available Skills
                </div>
                <div className="underline" />
                <Container fluid="sm">
                    {skills.length > 0 ? (
                        <Table striped bordered>
                            {/* Table header */}
                            <thead className="table-danger">
                                <tr className="text-center">
                                    <th>Skill</th>
                                    <th>Percent</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            {/* Table Contents */}
                            <tbody>{generateSkillRows()}</tbody>
                        </Table>
                    ) : (
                        <div className="text-center">No Skills Found</div>
                    )}
                </Container>
            </Container>
        </>
    );
}

export default AdminSkills;
