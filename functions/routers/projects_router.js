const express = require("express");
const { createProject, getProjectsByCategory, updateProject, getProjectCategories, deleteProject } = require("../models/projects");

const projectRouter = express.Router();

// create a new project
projectRouter.post("/", async (req, res) => {
    try {
        const {
            project_name,
            project_version,
            project_desc,
            project_link,
            project_link_play,
            project_explore,
            project_categories,
        } = req.body;

        let signature = req.headers["x-appwrite-signature"];
        if (!signature)
            return res
                .status(401)
                .json({ error: "Appwrite signature not found in the header" });

        let data = await createProject({
            project_name,
            project_version,
            project_desc,
            project_link,
            project_link_play,
            project_explore,
            project_categories,
            signature,
        });

        res.status(200).json(data);

    } catch (error) {
        res.status(error.code || 500).json({ error: error.message });
    }
});

// get projects by category
projectRouter.get("/", async (req, res) => {
    try {
        let project = await getProjectsByCategory({ category_id: req.query.category });
        res.status(200).json(project);
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message });
    }
});

// update a project
projectRouter.put("/", async (req, res) => {
    try {
        const {
            project_id,
            project_name,
            project_version,
            project_desc,
            project_link,
            project_link_play,
            project_explore,
            project_categories,
        } = req.body;

        let signature = req.headers["x-appwrite-signature"];
        if (!signature)
            return res
                .status(401)
                .json({ error: "Appwrite signature not found in the header" });

        let data = await updateProject({
            project_id,
            project_name,
            project_version,
            project_desc,
            project_link,
            project_link_play,
            project_explore,
            project_categories,
            signature,
        });

        res.status(200).json(data);

    } catch (error) {
        res.status(error.code || 500).json({ error: error.message });
    }
});

// get project categories
projectRouter.get("/categories", async (req, res) => {
    try {
        let project = await getProjectCategories();
        res.status(200).json(project);
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message });
    }
});

// delete a project
projectRouter.delete("/", async (req, res) => {
    let signature = req.headers["x-appwrite-signature"];
    if (!signature)
        return res
            .status(401)
            .json({ error: "Appwrite signature not found in the header" });
    try {
        await deleteProject(req.query.id, signature);
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message });
    }
});

module.exports = projectRouter;