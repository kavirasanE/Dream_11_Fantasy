const connectDB = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

const getUnits = async (req, res) => {
  try {
    let { UDR_Id } = req.body;
    if (UDR_Id) {
      const statement = `EXEC USP_Mobile_App @route = :route, @type = :type, @UDR_Id = :UDR_Id`;

      const replacements = {
        replacements: {
          route: "GET_ALL_UNITS",
          type: "GET",
          UDR_Id: UDR_Id,
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
        return res
          .status(200)
          .json({
            message: "Device found!",
            results: ["GRAMS", "KG", "LITRE", "PIECE"],
          });
        //   .json({ message: "Device found!", results: results });
      } else {
        return res.status(400).json({ message: "Invalid entry" });
      }
    } else {
      res.status(400).json({
        message: "Missing required field",
        requiredFields: [
          "UDR_Id - UDR_Id is the object key which you receive in getDevice info or after registering the device",
        ],
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = { getUnits };
