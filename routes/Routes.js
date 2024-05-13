
const express = require("express");
const { AddTeamController, TeamResults,ProcessTeamController } = require("../controllers/AddTeamController.js")
// const ProcessTeamController  = require("../controllers/ProcessTeamController.js")
const router = express.Router();

router.post("/add", AddTeamController)
router.get("/team", ProcessTeamController)
router.get("/results", TeamResults)

module.exports = router;


// db.teamPlayers.aggregate([
//     {
//       $group: {
//         _id: "$Team",
//         RR: { $sum: { $cond: [{ $eq: ["$Team", "Rajasthan Royals"] }, 1, 0] } },
//         CSK: { $sum: { $cond: [{ $eq: ["$Team", "Chennai Super Kings"] }, 1, 0] } },
//         BATTER: { $sum: { $cond: [{ $eq: ["$Role", "BATTER"] }, 1, 0] } },
//         ALL_ROUNDER: { $sum: { $cond: [{ $eq: ["$Role", "ALL-ROUNDER"] }, 1, 0] } },
//         WICKETKEEPER: { $sum: { $cond: [{ $eq: ["$Role", "WICKETKEEPER"] }, 1, 0] } },
//         BOWLER: { $sum: { $cond: [{ $eq: ["$Role", "BOWLER"] }, 1, 0] } }
//       }
//     }
//   ])
