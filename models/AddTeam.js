const mongoose = require("mongoose");

const AddTeamSchema = mongoose.Schema({
    TeamName: {
        type: String,
        required: true
    },
    Captain: {
        type: String,
        required: true
    },
    ViceCaptain: {
        type: String,
        required: true
    },
    Players: [
        { type: String }
    ]

}, {
    timestamps: true
});

const AddTeam = mongoose.model("AddTeam", AddTeamSchema);

module.exports = AddTeam;

// Players: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Player" // Assuming your model for players is named "Player"
// }]