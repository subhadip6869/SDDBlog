const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connection Successful"))
.catch((error) => console.log(error));