import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import AdminTemplate from "../../components/AdminTemplate";
import { storage } from "../../helpers/appwrite_helper";

function AchievementImage({ file, onDelete }) {
	const [hovered, setHovered] = useState(false);

	return (
		<div
			id="image-preview"
			key={file.$id}
			style={{
				height: 150,
				width: 150,
				position: "relative",
				transition: "0.3s",
				backgroundImage: `url(${storage.getFileView(
					"achievements",
					file.$id
				)})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				borderRadius: "8px",
				boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
				overflow: "hidden",
			}}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{/* Delete button appears on hover */}
			{hovered && (
				<>
					<button
						onClick={() => onDelete(file.$id)}
						style={{
							position: "absolute",
							top: "0px",
							right: "0px",
							backgroundColor: "rgba(255, 0, 0, 0.8)",
							color: "white",
							border: "none",
							borderBottomLeftRadius: "80%",
							width: "30px",
							height: "30px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
						}}
					>
						<i className="bi bi-trash" />
					</button>
					<div
						style={{
							position: "absolute",
							bottom: "0px",
							left: "0px",
							background:
								"linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2))",
							border: "none",
							color: "white",
							textOverflow: "ellipsis",
							overflow: "clip",
							width: "100%",
							height: "30%",
						}}
					>
						{file.name}
					</div>
				</>
			)}
		</div>
	);
}

function AdminAchievements() {
	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const [validated, setValidated] = useState(false);
	const [saving, setSaving] = useState(false);

	const [achieveFile, setAchieveFile] = useState("");
	const [fileName, setFileName] = useState("");

	const [savedFiles, setSavedFiles] = useState([]);

	const fetchAllFiles = async () => {
		try {
			let data = await storage.listFiles("achievements");
			setSavedFiles(data.files);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchAllFiles();
	}, []);

	useEffect(() => {
		try {
			// rename the file on changing the name
			let ext =
				achieveFile.name.split(".").length > 1
					? `.${achieveFile.name.split(".").pop()}`
					: "";
			let newFile = new File([achieveFile], `${fileName}${ext}`, {
				type: achieveFile.type,
			});
			setAchieveFile(newFile);
		} catch (_) {}
	}, [fileName]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (saving) return;
		setValidated(true);
		if (!e.currentTarget.parentElement.checkValidity()) return;
		if (!achieveFile) {
			setModalMessage("Please select a file.");
			setShowModal(true);
			return;
		}
		setSaving(true);
		try {
			await storage.createFile(
				"achievements",
				achieveFile.name,
				achieveFile
			);
			document.querySelector("#achieveFile").value = "";
			setAchieveFile("");
			setFileName("");
			setValidated(false);
			fetchAllFiles();
		} catch (err) {
			setModalMessage(err.message || "Something went wrong");
			setShowModal(true);
		} finally {
			setSaving(false);
		}
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
				<div className="about-heading text-center pt-3" id="form">
					Add Achievements
				</div>
				<div className="underline" />

				<Container fluid="sm">
					<Form method="post" noValidate validated={validated}>
						<Form.Group className="mb-3" controlId="achieveFile">
							<Form.Label>Upload Image</Form.Label>
							<Form.Control
								type="file"
								name="achieveFile"
								required
								accept="image/jpeg,image/png,image/heic"
								onChange={(e) => {
									const file = e.target.files[0];
									if (file) {
										const maxSize = 2 * 1024 * 1024; // 2MB limit
										if (file.size > maxSize) {
											alert(
												"File size exceeds 2MB. Please upload a smaller file."
											);
											e.target.value = "";
											setAchieveFile("");
											return;
										}
										setAchieveFile(file); // Save valid file
										setFileName(
											file.name.split(".").length > 1
												? file.name.replace(
														`.${file.name
															.split(".")
															.pop()}`,
														""
												  )
												: file.name
										);
									}
								}}
							/>
							<Form.Control.Feedback type="invalid">
								Please upload an image.
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group
							className="mb-3"
							controlId="achieveFileName"
						>
							<Form.Label>File Name</Form.Label>
							<Form.Control
								type="text"
								name="achieveFileName"
								required
								value={fileName}
								onChange={(e) => setFileName(e.target.value)}
							/>
							<Form.Control.Feedback type="invalid">
								Please upload an image.
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
							) : (
								"Upload"
							)}
						</Button>
					</Form>
				</Container>
			</Container>

			{/* List Available Projects */}
			<div className="about-heading text-center pt-3">
				Available Achievements
			</div>
			<div className="underline" />

			<Container fluid="sm d-flex gap-3 flex-wrap">
				{savedFiles.length > 0 ? (
					savedFiles.map((f) => (
						// TODO: Need to fix the components UI for the files
						<AchievementImage
							file={f}
							key={f.$id}
							onDelete={async () => {
								await storage.deleteFile("achievements", f.$id);
								fetchAllFiles();
							}}
						/>
					))
				) : (
					<div className="text-center w-100">
						No files uploaded yet
					</div>
				)}
			</Container>
		</AdminTemplate>
	);
}

export default AdminAchievements;
