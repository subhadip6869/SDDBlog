require("dotenv").config();
const { interestRouter } = require("./routers");
const express = require("express");
const app = express();
const router = express.Router();

const HOST = process.env.HOST || "http://localhost";
const PORT = process.env.PORT || 3000;
app.use(express.json());

router.use("/interests", interestRouter);

app.use("/api", router);
app.listen(PORT, () => {
    console.log(`Server running at ${HOST}:${PORT}`);
});
