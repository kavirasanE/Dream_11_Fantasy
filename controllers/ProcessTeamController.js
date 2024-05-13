const AddTeam = require("../models/AddTeam.js");
const asyncHandler = require("express-async-handler");
const teamPlayers = require("../data/players.json");
const matchJson = require("../data/match.json");



const combinedData = [];

const ProcessTeamController = asyncHandler(async (req, res) => {
    const getData = await AddTeam.find({});
    getData.map(async (teamData) => {
        const teamPlayer = teamData.Players;
        const teamObj = {
            TeamName: teamData.TeamName,
            Players: teamPlayer.map((p) => {
                const striker = 'non-striker';
                let filteredMatchPoints = matchJson.filter((m) => m.batter == "MM Ali" || m.bowler == "MM Ali" || m[striker] == "MM Ali");
                let points = filteredMatchPoints.reduce((output, name) => {
                    let batter = filteredMatchPoints.find((p) => p.batter == "MM Ali");
                    let bowler = filteredMatchPoints.find((p) => p.bowler == "MM Ali");
                    let fielder = filteredMatchPoints.find((p) => p.fielders_involved == "MM Ali");
                    let out = filteredMatchPoints.find((p) => p.player_out == "MM Ali");
                    let thirtyRunBonus = false
                    let halfCenturyBonus = false
                    let CenturyBonus = false
                    if (batter) {
                        if (name.batsman_run == 6) {
                            output.pts += name.batsman_run + 2;
                        }
                        if (output.pts >= 30 && !thirtyRunBonus) {
                            output.pts += 4;
                            thirtyRunBonus = true;
                        }
                        if (output.pts >= 50 && !halfCenturyBonus) {
                            output.pts += 8;
                            halfCenturyBonus = true;
                        }
                        if (output.pts >= 50 && !CenturyBonus) {
                            output.pts += 16;
                            CenturyBonus = true;
                        }
                        output.pts += name.batsman_run;
                        output.pts += name.extras_run;
                    }
                    if (bowler) {
                        let wicketTaken = 0;
                        if (name.kind == "lbw" || name.kind == "bowled" || name.kind) {
                            output.pts += 8
                        }
                        if (name.kind != "NA" && name.kind != "bowled") {
                            output.pts + 25;
                        }
                        if (name.isWicketDelivery == 1) {
                            wicketTaken += 1;
                            if (wicketTaken == 3) {
                                output.pts += 4
                            }
                            if (wicketTaken == 4) {
                                output.pts += 8
                            }
                            if (wicketTaken == 5) {
                                output.pts += 16
                            }
                        }
                        output.pts += name.isWicketDelivery;
                    }
                    if (fielder) {
                        let catches = 0;
                        if (name.kind == "caught" || name.kind == "caught and bowled") {
                            catches += 1;
                            output.pts += 8
                            if (catches == 3) {
                                output.pts += 4;
                            }
                        }
                        if(name.kind == "bowled"){
                            output.pts +=12
                        }

                    }
                    if (out && output.pts == 0 && !bowler) {
                        output.pts -= 2;
                    }
                    return output;
                }, { pts: 0 });

                return {
                    Player: "MM Ali",
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

module.exports = ProcessTeamController