const connectDB = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

const updateLogo = async (req, res) => {
    try {
        let {
            UDR_Id,
            logo,
        } = req.body;

        if (!UDR_Id || !logo) {
            return res.status(400).json({
                message: "Missing required field",
                requiredFields: [
                    "UDR_Id - UDR_Id is the object key which you receive in getDevice info or after registering the device",
                    "logo"
                ],
            });
        }


        const statement = `EXEC USP_Mobile_App @route = :route, @type = :type, @UDR_Id = :UDR_Id, @logo_uri = :logo_uri`;

        const replacements = {
            replacements: {
                route: "UPDATE_LOGO",
                type: "UPDATE",
                UDR_Id: UDR_Id,
                logo_uri: logo
            },
            type: QueryTypes.SELECT,
        };

        const results = await connectDB.query(statement, replacements);
        if (results.length > 0) {
            if (results[0].RESULTS == "No device found with this ID!") {
                return res
                    .status(400)
                    .json({ message: "No device found with this ID!" });
            }

            if (results[0].RESULTS == "Awaiting for approval!") {
                return res.status(400).json({ message: "Awaiting for approval!" });
            }
            if (results[0].RESULTS == "Subcription pending!") {
                return res.status(400).json({ message: "Subcription pending!" });
            }
            if (results[0].RESULTS == "Already default username chagned") {
                return res
                    .status(400)
                    .json({ message: "Already default username chagned!" });
            }
            if (results[0].RESULTS == "Default username change required!") {
                return res
                    .status(400)
                    .json({ message: "Default username change required!!" });
            }
            res.status(200).json({ message: "User found!", results: results });
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
        // res.status(400).json({message:"No active device found with this _id key. _id is the key _id which you receive in getDevice info",});
        // res.status(400).json({message:"The device is not yet approved! Please ask the admin to validate and approve your request",});
        // res.status(200).json({ message: "Device userName and password updated successfully!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error!" });
    }
};


const getLogo = async (req, res) => {
    try {

        let { UDR_Id } = req.body;

        if (!UDR_Id) {
            return res.status(400).json({
                message: "Missing required field",
                requiredFields: [
                    "UDR_Id - UDR_Id is the object key which you receive in getDevice info or after registering the device"
                ],
            });
        }


        const statement = `EXEC USP_Mobile_App @route = :route, @type = :type, @UDR_Id = :UDR_Id`;

        const replacements = {
            replacements: {
                route: "GET_LOGO",
                type: "GET",
                UDR_Id: UDR_Id
            },
            type: QueryTypes.SELECT,
        };

        const results = await connectDB.query(statement, replacements);


        return res.status(200).json({ message: "Device found!", results: results });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error!" });
    }
};


module.exports = { updateLogo,getLogo };
