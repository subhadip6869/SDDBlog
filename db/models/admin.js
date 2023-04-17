const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    admin_name: {type: String, required: true, maxlength: 20},
    admin_email: {type: String, required: true, maxlength: 30},
    admin_pass: {type: String, required: true},
});

const Admin = new mongoose.model("Admin", adminSchema);

module.exports = Admin;