const mongoose = require("../database/mongodb");

const Quirk = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["Emissão", "Transformação", "Mutação"]
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
    oneforall: {
        type: Boolean,
        default: false,
    },
    allforone: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String
    },
    crit_chance: {
        type: Number,
        required: true
    },
    control_chance: {
        type: Number,
        required: true
    },
    primary_function: {
        type: String,
        required: true,
        enum: ['ofensiva', 'defensiva', 'mobilidade', 'utilidade']
    },
    secondary_function: {
        type: String,        
        enum: ['ofensiva', 'defensiva', 'mobilidade', 'utilidade']
    },
    agility: {
        type: Number,
        required: true,        
    },
    precision: {
        type: Number,
        required: true,
    }
});

const quirkModel = mongoose.model("Quirk", Quirk);

module.exports = quirkModel;