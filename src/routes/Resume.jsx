import { useEffect, useState } from "react";
import { Col, Container, Modal, Row, Table } from "react-bootstrap";
import "../assets/main.css";
import { CustomProgressBar } from "../components";
import PageTemplate from "../components/PageTemplate";
import { getEducations, getSkills } from "../helpers/api";
import { storage } from "../helpers/appwrite_helper";

function Achievement({ file }) {
	const [hover, setHover] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [viewUrl, setViewUrl] = useState("");

	return (
		<>
			<Modal
				fullscreen
				centered
				show={showModal}
				onHide={() => {
					setShowModal(false);
					setViewUrl("");
				}}
			>
				<Modal.Header closeButton>
					<Modal.Title>{file.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div
						style={{
							backgroundColor: "#000000",
							height: "100%",
							width: "100%",
							backgroundImage: `url(${viewUrl})`,
							backgroundSize: "contain",
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center",
						}}
					/>
				</Modal.Body>
			</Modal>
			<div
				id="image-preview"
				className="rounded"
				style={{
					height: "10rem",
					position: "relative",
					transition: "0.3s",
					backgroundImage: `url(${storage.getFileView(
						"achievements",
						file.$id,
						150,
						100
					)})`,
					cursor: "pointer",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				onClick={async () => {
					setViewUrl(
						await storage.getFileView("achievements", file.$id)
					);
					setShowModal(true);
				}}
			>
				{hover && (
					<div
						className="d-flex align-items-end text-white p-2"
						style={{
							width: "100%",
							height: "70%",
							background:
								"linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.5), rgba(0,0,0,0.01))",
							position: "absolute",
							bottom: 0,
							left: 0,
							backdropFilter: "blur(2px)",
						}}
					>
						{file.name}
					</div>
				)}
			</div>
		</>
	);
}

function Resume() {
	const [skills, setSkills] = useState([]);
	const [educations, setEducations] = useState([]);

	const [savedFiles, setSavedFiles] = useState([]);

	const fetchSkills = async () => {
		try {
			let data = await getSkills();
			setSkills(data);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchAllFiles = async () => {
		try {
			let data = await storage.listFiles("achievements");
			setSavedFiles(data.files);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchEducations = async () => {
		try {
			let data = await getEducations();
			setEducations(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchSkills();
		fetchEducations();
		fetchAllFiles();
	}, []);

	return (
		<PageTemplate>
			<Container fluid="md" className="mt-5">
				<div className="about-heading text-center pt-3">
					Personal Details
				</div>
				<div className="underline"></div>
				<Row className="align-items-center gx-3 gy-3">
					<Col md="12" className="interests">
						<div className="element px-3 py-1">
							<Table striped>
								<tbody>
									<tr>
										<td className="left">
											<i className="bi bi-person"></i>{" "}
											Name:
										</td>
										<td className="right">
											Subhadip Dutta
										</td>
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
											<i className="bi bi-geo-alt"></i>{" "}
											From:
										</td>
										<td className="right">
											Bankura, West Bengal, India
										</td>
									</tr>
									<tr>
										<td className="left">
											<i className="bi bi-translate"></i>{" "}
											Languages:
										</td>
										<td className="right">
											Bengali, English & Hindi
										</td>
									</tr>
									<tr>
										<td className="left">
											<i className="bi bi-calendar3"></i>{" "}
											Date of birth:
										</td>
										<td className="right">
											April 29, 2001
										</td>
									</tr>
									<tr>
										<td className="left">
											<i className="bi bi-globe2"></i>{" "}
											Nationality:
										</td>
										<td className="right">Indian</td>
									</tr>
								</tbody>
							</Table>
						</div>
					</Col>
				</Row>
			</Container>

			<Container fluid="md" className="mt-5">
				<div className="about-heading text-center pt-3">
					Education Details
				</div>
				<div className="underline"></div>

				<Row className="align-items-center gx-2 gy-2">
					{educations.map((edu) => {
						return (
							<Col md="6" key={edu["$id"]}>
								<div className="element interests px-3 py-1">
									<p className="fw-bold text-white resume-year px-1 mb-1">
										{[
											new Date(
												edu.start_period
											).getFullYear(),
											edu.end_period
												? new Date(
														edu.end_period
												  ).getFullYear()
												: null,
										]
											.filter((d) => d != null)
											.join(" - ")}
									</p>
									<p className="fs-4 fw-bold">{edu.course}</p>
									<p className="descr opacity-50">
										{edu.description}
									</p>
								</div>
							</Col>
						);
					})}
				</Row>
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

			<Container fluid="md" className="mt-5">
				<div className="about-heading text-center pt-3">
					Certificates & Achievements
				</div>
				<div className="underline"></div>
				<Row className="align-items-center gx-2 gy-2">
					{savedFiles.map((file) => (
						<Col sm="3" key={file["$id"]}>
							<Achievement file={file} />
						</Col>
					))}
				</Row>
			</Container>
		</PageTemplate>
	);
}

export default Resume;
