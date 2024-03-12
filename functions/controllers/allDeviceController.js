const connectDB = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

const getAllDeviceForApproval = async (req, res) => {
  try {
    const statement = `EXEC USP_Mobile_App_Portal @route = :route, @type = :type`;
    const statement2 = `EXEC USP_Mobile_App_Portal @route = :route, @type = :type`;

    const replacements = {
      replacements: {
        route: "GET_ALL_DEVICE",
        type: "GET",
      },
      type: QueryTypes.SELECT,
    };

    const replacements2 = {
      replacements: {
        route: "GET_NUMBERS",
        type: "GET",
      },
      type: QueryTypes.SELECT,
    };
    const results = await connectDB.query(statement, replacements);
    const results2 = await connectDB.query(statement2, replacements2);

    return res
      .status(200)
      .json({ message: "Device found!", results: results, stats: results2 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};
const getAllDevice = async (req, res) => {
  try {
    const statement = `EXEC USP_Mobile_App_Portal @route = :route, @type = :type`;

    const replacements = {
      replacements: {
        route: "GET_DEVICE_INFO",
        type: "GET",
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

const updateApproval = async (req, res) => {
  try {
    let { UDR_Id } = req.body;
    if (UDR_Id) {
      const statement = `EXEC USP_Mobile_App_Portal @route = :route, @type = :type, @UDR_Id = :UDR_Id`;

      const replacements = {
        replacements: {
          route: "UPDATE_DEVICE",
          type: "APPROVAL",
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
          .json({ message: "Device found!", results: results });
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

module.exports = { getAllDeviceForApproval, getAllDevice, updateApproval };
