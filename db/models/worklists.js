const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const workSchema = mongoose.Schema({
    work_code: {type: String, required: true, maxlength: 6},
    work_type: {type: String, required: true, maxlength: 50, unique: true},
});

const projectSchema = mongoose.Schema({
    work_type: {type: String, required: true, maxlength: 50, unique: false},
    work_slug: {type: String, required: true, unique: false},
    project_name: {type: String, required: true, maxlength: 50},
    project_ver: {type: String, required: true, maxlength: 15},
    project_desc: {type: String, required: true},
    project_link: {type: String, required: false},
    project_link_play: {type: String, required: false},
    project_explore: {type: String, required: false}
});


const WorkList = new mongoose.model("WorkList", workSchema);
const ProjectList = new mongoose.model("ProjectList", projectSchema);

module.exports = {WorkList, ProjectList};