const connectDB = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

const getSubcriptionTypes = async (req, res) => {
  try {
    let { UDR_Id } = req.body;
    if (!UDR_Id) {
      return res.status(400).json({
        message: "Missing required field",
        requiredFields: [
          "UDR_Id - UDR_Id is the object key which you receive in getDevice info or after registering the device",
        ],
      });
    }
    const statement = `EXEC USP_Mobile_App @route = :route, @type = :type, @UDR_Id = :UDR_Id`;

    const replacements = {
      replacements: {
        route: "GET_SUBCRIPTION_DETAILS",
        type: "GET",
        UDR_Id: UDR_Id,
      },
      type: QueryTypes.SELECT,
    };

    const results = await connectDB.query(statement, replacements);
    if (results.length > 0) {
      return res.status(200).json({
        message: "Device found!",
        results: results,
      });
    } else {
      return res.status(400).json({ message: "Invalid entry" });
    }
    //   .json({ message: "Device found!", results: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const getSubType = async (req, res) => {
  try {
    const statement = `EXEC USP_Mobile_App_Portal @route = :route, @type = :type`;

    const replacements = {
      replacements: {
        route: "GET_SUB_TYPE",
        type: "GET",
      },
      type: QueryTypes.SELECT,
    };

    const results = await connectDB.query(statement, replacements);
    if (results.length > 0) {
      return res.status(200).json({
        message: "Device found!",
        results: results,
      });
    } else {
      return res.status(400).json({ message: "Invalid entry" });
    }
    //   .json({ message: "Device found!", results: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = { getSubcriptionTypes, getSubType };
