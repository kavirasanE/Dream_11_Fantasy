const AddTeam = require("../models/AddTeam.js");
const asyncHandler = require("express-async-handler");
const teamPlayers = require("../data/players.json");
const matchJson = require("../data/match.json");

const AddTeamController = asyncHandler(async (req, res) => {
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
    //   ]).toArray((err, result) => {
    //     if (err) {
    //       console.error("Error occurred while executing aggregation:", err);
    //     } else {
    //       console.log("Aggregation result:", result);
    //     }
    //   });

    const { TeamName, Captain, ViceCaptain, Players } = req.body;
    if (!TeamName || !Captain || !ViceCaptain || !Players) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }
    const newTeam = await AddTeam.findOne({ TeamName });

    // const findDup = await Players.includes(Captain,ViceCaptain)
    const findDup = [Captain, ViceCaptain].some(player => Players.includes(player));
    if (findDup) {
        res.status(400)
        throw new Error("Please Select Other Player Apart from Captain and Vice Captian")
    }
    console.log(findDup)
    if (Players.length != 9) {
        res.status(400)
        throw new Error("Every cricket team entry must have 11 players with Captain and Vice Captain")
    }

    const MaxPlayerinTeam = Players.reduce((output, PlayerName) => {
        let findPlayer = teamPlayers.find((p) => p.Player == PlayerName);
        // console.log(findPlayer);
        if (findPlayer) {
            if (findPlayer.Team === "Rajasthan Royals") {
                output.RR++;
            } else {
                output.CSK++;
            }
        }
        output[PlayerName] = findPlayer.Role;

        // Log PlayerName and Role
        console.log(`PlayerName: ${PlayerName}, Role: ${findPlayer.Role}`);

        switch (findPlayer.Role) {
            case "BATTER":
                output.BATTER++;
                break;
            case "ALL-ROUNDER":
                output.ALL_ROUNDER++;
                break;
            case "WICKETKEEPER":
                output.WICKETKEEPER++;
                break;
            case "BOWLER":
                output.BOWLER++;
                console.log(findPlayer);
                break;
            default:
                throw new Error("Player Role is Not Matched");
        }
        return output;
    }, { RR: 0, CSK: 0, ALL_ROUNDER: 0, WICKETKEEPER: 0, BOWLER: 0, BATTER: 0 })

    console.log(MaxPlayerinTeam)
    // console.log(MaxPlayerinTeam.CSK)

    if (MaxPlayerinTeam.CSK > 8 || MaxPlayerinTeam.RR > 8) {
        res.status(400)
        throw new Error("A maximum of 10 players can be selected from any one of the teams");
    }

    if (newTeam) {
        res.status(400)
        throw new Error("Team Already Exists")
    }
    if (MaxPlayerinTeam.WICKETKEEPER >= 1 && MaxPlayerinTeam.WICKETKEEPER <= 8 &&
        MaxPlayerinTeam.BATTER >= 1 && MaxPlayerinTeam.BATTER <= 8 &&
        MaxPlayerinTeam.ALL_ROUNDER >= 1 && MaxPlayerinTeam.ALL_ROUNDER <= 8 &&
        MaxPlayerinTeam.BOWLER >= 1 && MaxPlayerinTeam.BOWLER <= 8) {
        try {
            const newTeam = await AddTeam.create({
                TeamName,
                Captain,
                ViceCaptain,
                Players
            });
            res.status(201).json({
                id: newTeam._id,
                TeamName: newTeam.TeamName,
                Captain: newTeam.Captain,
                ViceCaptain: newTeam.ViceCaptain,
                Players: newTeam.Players
            });
        } catch (error) {

            console.error("Error creating team:", error);
            res.status(500).json({ error: "Failed to create a team" });
        }
    } else {
        throw new Error("These conditions ensure that there is at least 1 and at most 8 players for each player type: wicketkeeper, batter, all-rounder, and bowler.");
    }



});

// const ProcessTeamController = asyncHandler(async (req, res) => {

//     const getData = await AddTeam.find({ TeamName: "CHENNAI SUPER" });
//     const teamPlayer = getData[0].Players;
//     console.log(teamPlayer);  

//     let scorePoints = teamPlayer.map((PlayerName) => {
//         const striker = 'non-striker';
//         let filteredMatchPoints = matchJson.filter((m) => m.batter == PlayerName || m.bowler == PlayerName || m[striker] == PlayerName);
//         let points = filteredMatchPoints.reduce((output, name) => {
//             // console.log(name);
//             let batter = filteredMatchPoints.find((p) => p.batter == PlayerName);
//             let bowler = filteredMatchPoints.find((p) => p.bowler == PlayerName);
//             let striker = filteredMatchPoints.find((p) => p.striker == PlayerName);
//             // console.log(batter);
//             if (batter) {
//                 output.pts += name.batsman_run;
//             }
//             if (bowler) {
//                 output.pts += name.isWicketDelivery;
//             }
//             if (striker) {
//                 output.pts += name;
//             }

//             return output

//         }, { pts: 0 })
//         return points;
//     })
//     console.log(scorePoints);
//     if(scorePoints) { 
//         let combinedData = teamPlayer.map((name,index) => {
//             return { 
//                Player : name,
//                points: scorePoints[index].pts,
//             }
//         })
//         console.log(combinedData);

//         try{
//          res.status(200).send(combinedData);
//         }
//         catch(err) { 
//             res.status(400).send("Process not Completed")
//         }
//     }






//     // console.log(filteredMatchPoints);
//     // const filterTeam = await teamPlayer.map((PlayerName) => {
//     //     const striker = 'non-striker';
//     //     // let points = filteredMatchPoints.find((p) => p.batter !== PlayerName);
//     //     console.log(points);
//     // },)
//     // console.log(filterTeam);

// })
// const ProcessTeamController = asyncHandler(async (req, res) => {
//     let combinedData = [];

//     const getData = await AddTeam.find({})
//     // console.log(getData);

//     getData.map(async (teamData, index) => {
//         //   const teamPlayer = teamData[index].Players;
//         const teamPlayer = teamData.Players;
//         // console.log(teamPlayer[index].TeamName);
//         // console.log(teamPlayer);
//         let scorePoints = teamPlayer.map((PlayerName) => {
//             const striker = 'non-striker';
//             let filteredMatchPoints = matchJson.filter((m) => m.batter == PlayerName || m.bowler == PlayerName || m[striker] == PlayerName);
//             let points = filteredMatchPoints.reduce((output, name) => {
//                 // console.log(name);
//                 let batter = filteredMatchPoints.find((p) => p.batter == PlayerName);
//                 let bowler = filteredMatchPoints.find((p) => p.bowler == PlayerName);
//                 let striker = filteredMatchPoints.find((p) => p.striker == PlayerName);
//                 // console.log(batter);
//                 if (batter) {
//                     output.pts += name.batsman_run;
//                 }
//                 if (bowler) {
//                     output.pts += name.isWicketDelivery;
//                 }
//                 if (striker) {
//                     output.pts += name;
//                 }
//                 return output
//             }, { pts: 0 })
//             return points;
//         })
//         // console.log(scorePoints);

//     if (scorePoints) {
//         let combinedData = teamPlayer.map((name, index) => {
//             return {
//                 Player: name,
//                 points: scorePoints[index].pts,
//             }
//         }
// })
// console.log(combinedData);

// try {
//     res.status(200).send(combinedData);
// }
// catch (err) {
//     res.status(400).send("Process not Completed")
// }

// })

// const ProcessTeamController = asyncHandler(async (req, res) => {
//     let combinedData =[];

//     const getData = await AddTeam.find({});

//     getData.map(async (teamData) => {
//         combinedData = combinedData.concat({TeamName: teamData.TeamName});
//         console.log(combinedData);
//         const teamPlayer = teamData.Players;

//         console.log(teamPlayer);
//         let scorePoints = teamPlayer.map((PlayerName) => {
//             const striker = 'non-striker';
//             let filteredMatchPoints = matchJson.filter((m) => m.batter == PlayerName || m.bowler == PlayerName || m[striker] == PlayerName);
//             let points = filteredMatchPoints.reduce((output, name) => {
//                 let batter = filteredMatchPoints.find((p) => p.batter == PlayerName);
//                 let bowler = filteredMatchPoints.find((p) => p.bowler == PlayerName);
//                 let striker = filteredMatchPoints.find((p) => p.striker == PlayerName);

//                 if (batter) {
//                     output.pts += name.batsman_run;
//                 }
//                 if (bowler) {
//                     output.pts += name.isWicketDelivery;
//                 }
//                 if (striker) {
//                     // Adjust the logic according to how points are scored for the striker
//                 }
//                 return output;
//             }, { pts: 0 });
//             return points;
//         });

//         let teamCombinedData = teamPlayer.map((name, index) => {
//             return {
//                 Player: name,
//                 points: scorePoints[index].pts,
//             };
//         });

//         combinedData = combinedData.concat(teamCombinedData);
//     });
//     console.log(combinedData);

//     try {
//         res.status(200).send(combinedData);
//     } catch (err) {
//         res.status(400).send("Process not Completed");
//     }
// });




const combinedData = [];

const ProcessTeamController = asyncHandler(async (req, res) => {

    const getData = await AddTeam.find({});
    getData.map(async (teamData) => {
        const teamPlayer = teamData.Players;
        const teamObj = {
            TeamName: teamData.TeamName,
            Players: teamPlayer.map((PlayerName) => {
                const striker = 'non-striker';
                let filteredMatchPoints = matchJson.filter((m) => m.batter == PlayerName || m.bowler == PlayerName || m[striker] == PlayerName);
                let points = filteredMatchPoints.reduce((output, name) => {
                    let batter = filteredMatchPoints.find((p) => p.batter == PlayerName);
                    let bowler = filteredMatchPoints.find((p) => p.bowler == PlayerName);
                    let striker = filteredMatchPoints.find((p) => p.striker == PlayerName);
                    if (batter) {
                        output.pts += name.batsman_run;
                        console.log(output.pts);
                    }
                    if (bowler) {
                        output.pts += name.isWicketDelivery;
                    }
                    if (striker) {
                        
                    }
                    return output;
                }, { pts: 0 });
                return {
                    Player: PlayerName,
                    Points: points.pts
                };
            })
        };

        combinedData.push(teamObj);
    });

    try {
        res.status(200).json(combinedData);
    } catch (err) {
        res.status(400).send("Process not Completed");
    }
});



const TeamResults = asyncHandler(async (req, res) => {
    const TeamResults = [];
    let data = combinedData.map((player) => {

        let total = player.Players

        let TotalPoints = total.reduce((output, name) => {
            return output + name.Points;

        }, 0)


        return {
            TeamName: player.TeamName,
            Score: TotalPoints
        }
    })
    console.log(data);
    const ScoreBoard = {ScoreBoard : data}
    TeamResults.push(ScoreBoard);
    let score = []
    const Winner = data.map((p) => {
        score.push(p.Score);
    })
    let FinalPoints = score.sort((a, b) => b - a);
    console.log(FinalPoints[0]);
    let HighScore = 0;
    const Final_Winner = data.filter((p) => p.Score == FinalPoints[0])
    const Winners = { Winners: Final_Winner }
    console.log(Winners);
    TeamResults.push(Winners);
    // console.log(data);
    if (data) {
        try {
            res.status(200).send(TeamResults);
        }
        catch (err) {
            res.status(400).send("PLease Complete the http://localhost:5000/process/team process Team Route and get the Results")
        }
    }

});




module.exports = { AddTeamController, ProcessTeamController, TeamResults };