const express = require("express");
const {
    createEducation,
    getAllEducations,
    getEducationById,
    updateEducation,
    deleteEducation,
} = require("../models/educations");
const educationRouter = express.Router();

educationRouter.post("/", async (req, res) => {
    const { course, description, start_period, end_period } = req.body;
    let signature = req.headers["x-appwrite-signature"];
    if (!signature)
        return res
            .status(401)
            .json({ error: "Appwrite signature not found in the header" });

    try {
        let startPeriod = new Date(start_period);
        let endPeriod = null;
        if (end_period) {
            endPeriod = new Date(end_period);
        }
        if (startPeriod == "Invalid Date" || endPeriod == "Invalid Date") {
            return res.status(400).json({ error: "Invalid date format" });
        } else if (endPeriod && startPeriod.getTime() > endPeriod.getTime()) {
            return res
                .status(400)
                .json({ error: "Start date cannot be greater than end date" });
        }

        const education = await createEducation({
            course,
            description,
            start_period: startPeriod,
            end_period: endPeriod,
            signature,
        });
        res.status(200).json(education);
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message });
    }
});

educationRouter.get("/", async (req, res) => {
    try {
        if (req.query.id) {
            let education = await getEducationById(req.query.id);
            res.status(200).json(education);
        } else {
            const educations = await getAllEducations();
            res.status(200).json(educations);
        }
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message });
    }
});

educationRouter.put("/", async (req, res) => {
    let signature = req.headers["x-appwrite-signature"];
    if (!signature)
        return res
            .status(401)
            .json({ error: "Appwrite signature not found in the header" });

    try {
        const { course, description, start_period, end_period } = req.body;

        let startPeriod, endPeriod;
        if (start_period) {
            startPeriod = new Date(start_period);
        }
        if (end_period) {
            endPeriod = new Date(end_period);
        }
        if (startPeriod == "Invalid Date" || endPeriod == "Invalid Date") {
            return res.status(400).json({ error: "Invalid date format" });
        } else if (
            startPeriod &&
            endPeriod &&
            startPeriod.getTime() > endPeriod.getTime()
        ) {
            return res
                .status(400)
                .json({ error: "Start date cannot be greater than end date" });
        }

        const education = await updateEducation(req.query.id, {
            course,
            description,
            start_period: startPeriod,
            end_period: endPeriod,
            signature,
        });
        res.status(200).json(education);
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message });
    }
});

educationRouter.delete("/", async (req, res) => {
    let signature = req.headers["x-appwrite-signature"];
    if (!signature)
        return res
            .status(401)
            .json({ error: "Appwrite signature not found in the header" });
    try {
        await deleteEducation(req.query.id, { signature });
        res.status(200).json({ message: "Education deleted successfully" });
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message });
    }
});

module.exports = educationRouter;
