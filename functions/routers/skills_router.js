const express = require("express");
const {
	getAllSkills,
	getSkillById,
	createSkill,
	updateSkill,
	deleteSkill,
} = require("../models/skills");

const skillRouter = express.Router();

skillRouter.get("/", async (req, res) => {
	try {
		let id = req.query.id;
		if (id) {
			let skill = await getSkillById(id);
			res.status(200).json(skill);
		} else {
			let skills = await getAllSkills();
			res.status(200).json(skills);
		}
	} catch (error) {
		res.status(error.code || 500).json({ error: error.message });
	}
});

skillRouter.post("/", async (req, res) => {
	try {
		const { name, percent } = req.body;

		let signature = req.headers["x-appwrite-signature"];
		if (!signature)
			return res
				.status(401)
				.json({ error: "Appwrite signature not found in the header" });

		const skill = await createSkill({ name, percent, signature });
		res.status(200).json(skill);
	} catch (error) {
		res.status(error.code || 500).json({ error: error.message });
	}
});

skillRouter.put("/", async (req, res) => {
	let signature = req.headers["x-appwrite-signature"];
	if (!signature)
		return res
			.status(401)
			.json({ error: "Appwrite signature not found in the header" });
	try {
		const { name, percent } = req.body;
		const id = req.query.id;
		const skill = await updateSkill(id, { name, percent, signature });
		res.status(200).json(skill);
	} catch (error) {
		res.status(error.code || 500).json({ error: error.message });
	}
});

skillRouter.delete("/", async (req, res) => {
	let signature = req.headers["x-appwrite-signature"];
	if (!signature)
		return res
			.status(401)
			.json({ error: "Appwrite signature not found in the header" });
	try {
		await deleteSkill(req.query.id, signature);
		res.status(200).json({ message: "Skill deleted successfully" });
	} catch (error) {
		res.status(error.code || 500).json({ error: error.message });
	}
});

module.exports = skillRouter;
