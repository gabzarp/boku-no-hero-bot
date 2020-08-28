const mongoose = require("../database/mongodb");

const User = new mongoose.Schema({
    name: { type: String, unique: true },
    lastQuirk: { type: Date, default: Date.now },
    quirk: { type: mongoose.Schema.Types.ObjectId, ref: "Quirk" },
    alignment: { type: String, enum: ["hero", "villain"] },
    userId: { type: String, required: true },
    defence: {
        type: Number,
        min: 0,
        max: 100
    },
    attack: {
        type: Number,
        min: 0,
        max: 100
    },
    power: {
        type: Number,
        min: 0,
        max: 100
    },
    defence_power: {
        type: Number,
        min: 0,
        max: 100
    },
    agility: {
        type: Number,
        min: 0,
        max: 100      
    },
    precision: {
        type: Number,
        min: 0,
        max: 100
    },
    utility: {
        type: Number,
        min: 0,
        max: 100
    },
    stamina: {
        type: Number,
        min: 0,
        max: 5,
        default: 5
    },
    trained: {
        type: Number,
        default: 1
    }
});
module.exports = mongoose.model("User", User);