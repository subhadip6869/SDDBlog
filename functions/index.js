require("dotenv").config();
const cors = require("cors");
const {
	interestRouter,
	educationRouter,
	projectRouter,
	skillRouter,
} = require("./routers");
const express = require("express");
const app = express();

app.use(
	cors({
		origin: "*",
		methods: "GET,PUT,POST,DELETE",
		credentials: true,
		allowedHeaders: "Content-Type, Authorization",
	})
);
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

const HOST = process.env.HOST || "http://localhost";
const PORT = process.env.PORT || 3000;
app.use(express.json());

router.use("/interests", interestRouter);
router.use("/education", educationRouter);
router.use("/projects", projectRouter);
router.use("/skills", skillRouter);

app.use("/api", router);

app.listen(PORT, () => {
	console.log(`Server running at ${HOST}:${PORT}`);
});
