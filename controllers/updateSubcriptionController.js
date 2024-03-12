const connectDB = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

const updateSubcription = async (req, res) => {
  try {
    let { UDR_Id, subcriptionTypeId, transactionId } = req.body;
    if (!UDR_Id || !subcriptionTypeId || !transactionId) {
      return res.status(400).json({
        message: "Missing required field",
        requiredFields: [
          "UDR_Id - UDR_Id is the object key which you receive in getDevice info or after registering the device",
          "subcriptionTypeId",
          "transactionId",
        ],
      });
    }
    const statement = `EXEC USP_Mobile_App @route = :route, @type = :type, @UDR_Id = :UDR_Id, @sub_type_id = :sub_type_id, @transactionid = :transactionid`;

    const replacements = {
      replacements: {
        route: "UPDATE_SUBCRIPTION",
        type: "UPDATE",
        UDR_Id: UDR_Id,
        sub_type_id: subcriptionTypeId,
        transactionid: transactionId,
      },
      type: QueryTypes.SELECT,
    };
    const results = await connectDB.query(statement, replacements);
    if (results.length > 0) {
      if (results[0].RESULTS == "Subcription already exists") {
        return res.status(400).json({ message: "Subcription already exists!" });
      }
      res.status(200).json({ message: "Subcription added!", results: results });
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

module.exports = { updateSubcription };
