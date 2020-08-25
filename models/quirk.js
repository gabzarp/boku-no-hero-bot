const mongoose = require("../database/mongodb");

const Quirk = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
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
    image: {
        type: String
    },
});

const quirkModel = mongoose.model("Quirk", Quirk);

module.exports = quirkModel;