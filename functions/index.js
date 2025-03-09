require("dotenv").config();
const { interestRouter, educationRouter, projectRouter } = require("./routers");
const express = require("express");
const app = express();
const router = express.Router();

const HOST = process.env.HOST || "http://localhost";
const PORT = process.env.PORT || 3000;
app.use(express.json());

router.use("/interests", interestRouter);
router.use("/education", educationRouter);
router.use("/projects", projectRouter);

app.use("/api", router);
app.listen(PORT, () => {
    console.log(`Server running at ${HOST}:${PORT}`);
});
