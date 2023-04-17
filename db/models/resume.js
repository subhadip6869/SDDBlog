const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
    edu_duration: {type: String, maxlength: 9, required: true},
    edu_degree: {type: String, maxlength: 25, required: true},
    edu_desc: {type: String, required: true},
});

const knowledgeSchema = new mongoose.Schema({
    lang_name: {type: String, maxlength: 15, required: true},
    lang_percent: {type: Number, max: 100, min: 0, default: 0},
});

const Education = new mongoose.model("Education", educationSchema);
const Knowledge = new mongoose.model("Knowledge", knowledgeSchema);

module.exports = {Education, Knowledge};