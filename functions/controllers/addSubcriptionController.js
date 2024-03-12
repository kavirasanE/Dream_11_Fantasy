const connectDB = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

const getSubcriptionInfo = async (req, res) => {
  try {
    // const statement = `EXEC USP_Mobile_App_Portal @route = :route, @type = :type, @UDR_Id = :UDR_Id`;
    const statement2 = `EXEC USP_Mobile_App_Portal @route = :route, @type = :type`;

    // const replacements = {      
    //   replacements: {
    //     route: "ADD_SUBCRIPTION",
    //     type: "GETDEVICE",
    //     UDR_Id: UDR_Id,
    //   },
    //   type: QueryTypes.SELECT,
    // };
    const replacements2 = {
      replacements: {
        route: "GET_SUBCRIPTION_DETAILS",
        type: "GET",
      },
      type: QueryTypes.SELECT,
    };

    // const results = await connectDB.query(statement, replacements);
    const results2 = await connectDB.query(statement2, replacements2);

    if (results2.length > 0) {
      return res.status(200).json({
        message: "Device found!",
        // device: results,
        subcriptionTypes: results2,
      });
    } else {
      return res.status(400).json({ message: "Invalid entry" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = { getSubcriptionInfo };
