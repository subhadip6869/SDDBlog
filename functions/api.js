require("dotenv").config();

const express = require("express");
const serverless = require("serverless-http");
const { interestRouter, educationRouter, projectRouter, skillRouter } = require("./routers");

const app = express();
const router = express.Router();
app.use(express.json());

router.use("/interests", interestRouter);
router.use("/education", educationRouter);
router.use("/projects", projectRouter);
router.use("/skills", skillRouter);

app.use("/api", router);

module.exports.handler = serverless(app);
