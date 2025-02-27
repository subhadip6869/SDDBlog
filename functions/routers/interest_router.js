const express = require("express");
const {
    createInterest,
    getAllInterests,
    getInterestById,
    updateInterest,
    deleteInterest,
} = require("../models/interests");
const interestRouter = express.Router();

interestRouter.post("/", async (req, res) => {
    try {
        const {
            bootstrap_icon_class: intr_icon,
            interest_title: intr_title,
            interest_desc: intr_desc,
            skill_percent: skill_percent,
        } = req.body;

        let signature = req.headers["x-appwrite-signature"];
        if (!signature)
            return res
                .status(401)
                .json({ error: "Appwrite signature not found in the header" });

        const interest = await createInterest({
            intr_icon,
            intr_title,
            intr_desc,
            skill_percent,
            signature,
        });
        res.status(201).json(interest);
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message });
    }
});

interestRouter.get("/", async (req, res) => {
    try {
        if (req.query.id) {
            const interest = await getInterestById(req.query.id);
            res.status(200).json(interest);
        } else {
            const interest = await getAllInterests();
            res.status(200).json(interest);
        }
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message });
    }
});

interestRouter.put("/", async (req, res) => {
    let signature = req.headers["x-appwrite-signature"];
    if (!signature)
        return res
            .status(401)
            .json({ error: "Appwrite signature not found in the header" });
    try {
        const {
            bootstrap_icon_class: intr_icon,
            interest_title: intr_title,
            interest_desc: intr_desc,
            skill_percent: skill_percent,
        } = req.body;
        const interest = await updateInterest(req.query.id, {
            intr_icon,
            intr_title,
            intr_desc,
            skill_percent,
            signature,
        });
        res.status(200).json(interest);
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message });
    }
});

interestRouter.delete("/", async (req, res) => {
    let signature = req.headers["x-appwrite-signature"];
    if (!signature)
        return res
            .status(401)
            .json({ error: "Appwrite signature not found in the header" });
    try {
        await deleteInterest(req.query.id, { signature });
        res.status(200).json({ message: "Interest data deleted successfully" });
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message });
    }
});

module.exports = interestRouter;
