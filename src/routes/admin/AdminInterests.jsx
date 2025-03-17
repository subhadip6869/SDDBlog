import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { AdminNavbar } from "../../components/metadata";
import {
    addInterest,
    deleteInterest,
    getInterests,
    updateInterest,
} from "../../helpers/api";
import account from "../../helpers/appwrite_helper";

function AdminInterests() {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [validated, setValidated] = useState(false);
    const [saving, setSaving] = useState(false);

    const [interests, setInterests] = useState([]);

    const [interestId, setInterestId] = useState("");
    const [interestIcon, setInterestIcon] = useState("");
    const [interestTitle, setInterestTitle] = useState("");
    const [interestDesc, setInterestDesc] = useState("");
    const [interestPercent, setInterestPercent] = useState(100);

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
            if (interestId) {
                data = await updateInterest({
                    id: interestId,
                    icon: interestIcon,
                    title: interestTitle,
                    description: interestDesc,
                    percent: interestPercent,
                    signature: jwt,
                });
            }
            // else it's a new interest
            else {
                data = await addInterest({
                    icon: interestIcon,
                    title: interestTitle,
                    description: interestDesc,
                    percent: interestPercent,
                    signature: jwt,
                });
            }
            console.log(data.code);

            // handle response
            if (data.code === 201 || data.code === 200) {
                fetchInterests();
                setInterestId("");
                setInterestIcon("");
                setInterestTitle("");
                setInterestDesc("");
                setValidated(false);
            } else {
                setModalMessage(data.error);
                setShowModal(true);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (saving) return;
        if (confirm("Are you sure you want to delete this interest?")) {
            setSaving(true);
            let jwt = (await account.createJWT()).jwt;
            try {
                let data = await deleteInterest({ id, signature: jwt });
                if (data.code !== 200) {
                    setModalMessage(data.error);
                    setShowModal(true);
                } else {
                    fetchInterests();
                }
            } catch (err) {
                console.log(err);
            } finally {
                setSaving(false);
            }
        }
    };

    const populateEdit = (intr) => {
        setInterestId(intr["$id"]);
        setInterestIcon(intr.intr_icon);
        setInterestTitle(intr.intr_title);
        setInterestDesc(intr.intr_desc);
        setInterestPercent(intr.skill_percent);
    };

    const generateInterestRows = () => {
        return interests.map((intr) => (
            <tr key={intr["$id"]}>
                <td>{intr.intr_title}</td>
                <td>{intr.skill_percent}%</td>
                <td className="text-center">
                    <a
                        href=""
                        onClick={(e) => {
                            e.preventDefault();
                            populateEdit(intr);
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
                            handleDelete(intr["$id"]);
                        }}
                    >
                        <i className="bi bi-trash"></i>
                    </a>
                </td>
            </tr>
        ));
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
                    Add Interests
                </div>
                <div className="underline" />

                <Container fluid="sm">
                    <Form method="post" noValidate validated={validated}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                maxLength={50}
                                required
                                value={interestTitle}
                                onChange={(e) =>
                                    setInterestTitle(e.target.value)
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter interest title.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="desc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as={"textarea"}
                                name="desc"
                                rows={3}
                                maxLength={200}
                                required
                                value={interestDesc}
                                onChange={(e) =>
                                    setInterestDesc(e.target.value)
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter interest description.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="icon">
                            <Form.Label>Bootstrap Icon Class</Form.Label>
                            <Form.Control
                                type="text"
                                name="icon"
                                maxLength={30}
                                value={interestIcon}
                                onChange={(e) =>
                                    setInterestIcon(e.target.value)
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter bootstrap icon class.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="percent">
                            <Form.Label>Percent: {interestPercent}%</Form.Label>
                            <Form.Range
                                name="percent"
                                min={20}
                                max={100}
                                step={1}
                                value={interestPercent}
                                onChange={(e) =>
                                    setInterestPercent(e.target.value)
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter bootstrap icon class.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                            type="submit"
                            variant="success"
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
                            ) : interestId ? (
                                "Update"
                            ) : (
                                "Create"
                            )}
                        </Button>
                    </Form>
                </Container>

                {/* List Available Projects */}
                <div className="about-heading text-center pt-3">
                    Available Educations
                </div>
                <div className="underline" />
                <Container fluid="sm">
                    {interests.length > 0 ? (
                        <Table striped bordered>
                            {/* Table header */}
                            <thead className="table-danger">
                                <tr className="text-center">
                                    <th>Title</th>
                                    <th>Percent</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            {/* Table Contents */}
                            <tbody>{generateInterestRows()}</tbody>
                        </Table>
                    ) : (
                        <div className="text-center">No Interests Found</div>
                    )}
                </Container>
            </Container>
        </>
    );
}

export default AdminInterests;
