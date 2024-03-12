const connectDB = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

const getDeviceInfo = async (req, res) => {
  try {
    let { DeviceId } = req.body;
    if (DeviceId) {
      const statement = `EXEC USP_Mobile_App @route = :route, @type = :type, @deviceid = :deviceid`;
      const statement2 = `EXEC USP_Mobile_App @route = :route, @type = :type, @deviceid = :deviceid`;

      const replacements = {
        replacements: {
          route: "GET_DEVICE_INFO",
          type: "GET",
          deviceid: DeviceId,
        },
        type: QueryTypes.SELECT,
      };
      const replacements2 = {
        replacements: {
          route: "GET_CASHIER_LIST",
          type: "GET",
          deviceid: DeviceId,
        },
        type: QueryTypes.SELECT,
      };

      const results = await connectDB.query(statement, replacements);
      const cashierList = await connectDB.query(statement2, replacements2);

      if (results.length > 0) {
        const cahsier = cashierList
          .filter((itm) => itm.LoginType == "Cashier")
          // .map((itm) => itm.UserName);
        const StoreOwner = cashierList
          .filter((itm) => itm.LoginType == "Admin")
         // .map((itm) => itm.UserName);

        results[0].cashierList = cahsier;
        results[0].storeOwnerLogin = StoreOwner[0];

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

module.exports = { getDeviceInfo };
