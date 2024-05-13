const mongoose = require("mongoose");
const { type } = require("os");

const PlayersSchema = mongoose.Schema({
    BOWLER: {
        type: String,
        required: true
    },
    WICKETKEEPER: {
        type: String,
        required: true
    },
    ALL_ROUNDER: {
        type: String,
        required: true
    },
    BATTER: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    })

const Players = mongoose.model("Players", PlayersSchema);

module.exports = Players;
