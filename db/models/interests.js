const mongoose = require("mongoose");

const interestSchema = mongoose.Schema({
    intr_icon: {type: String, required: true, maxlength: 30},
    intr_title: {type: String, required: true, maxlength: 20},
    intr_descr: {type: String, required: true},
    skill_percent: {type: Number, required: true, default: 0}
});

const Interest = new mongoose.model("Interest", interestSchema);

module.exports = Interest;