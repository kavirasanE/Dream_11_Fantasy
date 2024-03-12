const connectDB = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

const registerDevice = async (req, res) => {
  try {
    let {
      deviceId,
      shopName,
      shopAddress,
      shopType,
      email,
      mobile,
      isGSTAvailable,
      GSTNumber,
    } = req.body;

    if (
      deviceId &&
      shopName &&
      shopAddress &&
      shopType &&
      email &&
      mobile &&
      isGSTAvailable
    ) {
      if (isGSTAvailable == "true" && !GSTNumber) {
        return res.status(400).json({
          message:
            "Missing required field. Since GST is true, GST number are mandatory",
        });
      }
      const statement = `EXEC USP_Mobile_App @route = :route, @type = :type, @deviceid = :deviceid, @shopname =:shopname, @shopaddress =:shopaddress, @shoptype =:shoptype, @email =:email, @mobile =:mobile, @isgstshop =:isgstshop, @gstnumber =:gstnumber`;

      const replacements = {
        replacements: {
          route: "REGISTER",
          type: "INSERT",
          deviceid: deviceId,
          shopname: shopName,
          shopaddress: shopAddress,
          shoptype: shopType,
          email: email,
          mobile: mobile,
          isgstshop: isGSTAvailable == "true" ? 1 : 0,
          gstnumber: GSTNumber ? GSTNumber : 0,
        },
        type: QueryTypes.SELECT,
      };

      const results = await connectDB.query(statement, replacements);

      if (results[0].RESULTS == "Already device exists") {
        return res.status(400).json({ message: "Device already registered!" });
      }
      return res
        .status(201)
        .json({ message: "Device registered successfully!", results: results });
    } else {
      return res.status(400).json({
        message: "Missing required field",
        requiredFields: [
          "deviceId",
          "shopName",
          "shopAddress",
          "shopType",
          "email",
          "mobile",
          "isGSTAvailable",
        ],
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = { registerDevice };
