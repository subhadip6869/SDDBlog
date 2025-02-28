require("dotenv").config();

const express = require("express");
const serverless = require("serverless-http");
const { interestRouter, educationRouter } = require("./routers");

const app = express();
const router = express.Router();
app.use(express.json());

router.use("/interests", interestRouter);
router.use("/education", educationRouter);

app.use("/api", router);

module.exports.handler = serverless(app);
