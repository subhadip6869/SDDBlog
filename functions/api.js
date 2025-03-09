require("dotenv").config();

const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const {
	interestRouter,
	educationRouter,
	projectRouter,
	skillRouter,
} = require("./routers");

const app = express();

app.use(
	cors({
		origin: "*",
		methods: "GET,PUT,POST,DELETE",
		credentials: true,
		allowedHeaders: "Content-Type, Authorization",
	})
);

const router = express.Router();
app.use(express.json());

router.use("/interests", interestRouter);
router.use("/education", educationRouter);
router.use("/projects", projectRouter);
router.use("/skills", skillRouter);

app.use("/api", router);

module.exports.handler = serverless(app);
