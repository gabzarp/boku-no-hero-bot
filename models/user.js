const mongoose = require("../database/mongodb");

const User = new mongoose.Schema({
    name: { type: String },
    lastQuirk: { type: Date },
    quirk: { type: mongoose.Schema.Types.ObjectId, ref: "Quirk" },
    alignment: { type: String, enum: ["hero", "vilain"] },
    userId: { type: String, required: true },
    defence: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    attack: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    power: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    defence_power: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    agility: {
        type: Number,
        required: true,  
        min: 0,
        max: 100      
    },
    precision: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    utility: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
});
module.exports = mongoose.model("User", User);