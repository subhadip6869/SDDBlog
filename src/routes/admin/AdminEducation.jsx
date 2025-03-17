import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { AdminNavbar, CustomFooter } from "../../components/metadata";
import {
    addEducation,
    deleteEducation,
    getEducations,
    updateEducation,
} from "../../helpers/api";
import account from "../../helpers/appwrite_helper";

function AdminEducation() {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [validated, setValidated] = useState(false);
    const [saving, setSaving] = useState(false);

    const [educations, setEducations] = useState([]);

    const [courseId, setCourseId] = useState("");
    const [courseName, setCourseName] = useState("");
    const [courseDesc, setCourseDesc] = useState("");
    const [courseStart, setCourseStart] = useState("");
    const [courseEnd, setCourseEnd] = useState("");

    const fetchEducations = async () => {
        try {
            const educations = await getEducations();
            setEducations(educations);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchEducations();
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
            if (courseId) {
                data = await updateEducation({
                    id: courseId,
                    course: courseName,
                    description: courseDesc,
                    start: courseStart,
                    end: courseEnd,
                    signature: jwt,
                });
            }
            // else it's a new course
            else {
                data = await addEducation({
                    course: courseName,
                    description: courseDesc,
                    start: courseStart,
                    end: courseEnd,
                    signature: jwt,
                });
            }
            // handle response
            if (data.code !== 200) {
                setModalMessage(data.error);
                setShowModal(true);
            } else {
                fetchEducations();
                setCourseId("");
                setCourseName("");
                setCourseDesc("");
                setCourseStart("");
                setCourseEnd("");
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
        if (confirm("Are you sure you want to delete this course?")) {
            setSaving(true);
            let jwt = (await account.createJWT()).jwt;
            try {
                let data = await deleteEducation({ id, signature: jwt });
                if (data.code !== 200) {
                    setModalMessage(data.error);
                    setShowModal(true);
                } else {
                    fetchEducations();
                }
            } catch (err) {
                console.log(err);
            } finally {
                setSaving(false);
            }
        }
    };

    const populateEdit = (education) => {
        let startDate = new Date(education["start_period"]);
        let endDate = education["end_period"]
            ? new Date(education["end_period"])
            : null;

        setCourseId(education["$id"]);
        setCourseName(education["course"]);
        setCourseDesc(education["description"]);
        setCourseStart(`${startDate.toLocaleDateString("en-CA")}`);
        setCourseEnd(endDate ? `${endDate.toLocaleDateString("en-CA")}` : "");
        document.getElementById("form").scrollIntoView({ behavior: "smooth" });
    };

    const generateEducationRows = () => {
        return educations.map((education) => (
            <tr key={education["$id"]}>
                <td>{education.course}</td>
                <td className="text-end">
                    {new Date(education.start_period).toLocaleDateString(
                        "en-CA",
                        { dateStyle: "medium" }
                    )}
                </td>
                <td className="text-end">
                    {education.end_period
                        ? new Date(education.end_period).toLocaleDateString(
                              "en-CA",
                              { dateStyle: "medium" }
                          )
                        : "-"}
                </td>
                <td className="text-center">
                    <a
                        href=""
                        onClick={(e) => {
                            e.preventDefault();
                            populateEdit(education);
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
                            handleDelete(education["$id"]);
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
                    Add Education
                </div>
                <div className="underline" />

                <Container fluid="sm">
                    <Form method="post" noValidate validated={validated}>
                        <Form.Group className="mb-3" controlId="courseName">
                            <Form.Label>Course</Form.Label>
                            <Form.Control
                                type="text"
                                name="courseName"
                                maxLength={50}
                                required
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter course name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="courseDesc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="courseDesc"
                                maxLength={200}
                                required
                                value={courseDesc}
                                onChange={(e) => setCourseDesc(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter course description.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="d-flex gap-3">
                            <Form.Group
                                className="mb-3 flex-grow-1"
                                controlId="courseStart"
                            >
                                <Form.Label>Start Period</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="courseStart"
                                    required
                                    value={courseStart}
                                    onChange={(e) =>
                                        setCourseStart(e.target.value)
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter course start date.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                className="mb-3 flex-grow-1"
                                controlId="courseEnd"
                            >
                                <Form.Label>End Period</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="courseEnd"
                                    value={courseEnd}
                                    onChange={(e) =>
                                        setCourseEnd(e.target.value)
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter course end date.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

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
                            ) : courseId ? (
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
                    {educations.length > 0 ? (
                        <Table striped bordered>
                            {/* Table header */}
                            <thead className="table-danger">
                                <tr className="text-center">
                                    <th>Course</th>
                                    <th>Start Period</th>
                                    <th>End Period</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            {/* Table Contents */}
                            <tbody>{generateEducationRows()}</tbody>
                        </Table>
                    ) : (
                        <div className="text-center">No Courses Found</div>
                    )}
                </Container>
            </Container>

            <CustomFooter />
        </>
    );
}

export default AdminEducation;
