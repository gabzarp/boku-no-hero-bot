const mongoose = require("../database/mongodb");

const User = new mongoose.Schema({
    lastQuirk: { type: Date },
    quirk: { type: mongoose.Schema.Types.ObjectId, ref: "Quirk" },
    userId: { type: String, required: true },
});
module.exports = mongoose.model("User", User);