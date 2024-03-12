const connectDB = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

const updateExpiry = async (req, res) => {
  try {
    let { UDR_Id, subcriptionId } = req.body;
    if (!UDR_Id || !subcriptionId) {
      return res.status(400).json({
        message: "Missing required field",
        requiredFields: [
          "UDR_Id - UDR_Id is the object key which you receive in getDevice info or after registering the device",
          "subcriptionId",
        ],
      });
    }
    const statement = `EXEC USP_Mobile_App @route = :route, @type = :type, @UDR_Id = :UDR_Id, @getid = :sub_id`;

    const replacements = {
      replacements: {
        route: "SUBCRIPTION_EXPIRED",
        type: "UPDATE",
        UDR_Id: UDR_Id,
        sub_id: subcriptionId,
      },
      type: QueryTypes.SELECT,
    };
    const results = await connectDB.query(statement, replacements);
    if (results.length > 0) {
      res.status(200).json({ message: "Updated expiry!", results: results });
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

module.exports = { updateExpiry };
