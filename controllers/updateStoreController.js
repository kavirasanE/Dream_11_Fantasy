const connectDB = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

const updateStore = async (req, res) => {
  try {
    let {
      UDR_Id,
      shopName,
      shopAddress,
      shopType,
      email,
      mobile,
      isGSTAvailable,
      GSTNumber,
    } = req.body;

    if (
      !UDR_Id ||
      !shopName ||
      !shopAddress ||
      !shopType ||
      !email ||
      !mobile ||
      !isGSTAvailable
    ) {
      return res.status(400).json({
        message: "Missing required field",
        requiredFields: [
          "UDR_Id - UDR_Id is the object key which you receive in getDevice info or after registering the device",
          "shopName",
          "shopAddress",
          "shopType",
          "email",
          "mobile",
          "isGSTAvailable",
        ],
      });
    }

    if (isGSTAvailable == "true" && !GSTNumber) {
      return res.status(400).json({
        message:
          "Missing required field. Since GST is true, GST number are mandatory",
      });
    }
    const statement = `EXEC USP_Mobile_App @route = :route, @type = :type, @shopname =:shopname, @shopaddress =:shopaddress, @shoptype =:shoptype, @email =:email, @mobile =:mobile, @isgstshop =:isgstshop, @gstnumber =:gstnumber, @UDR_Id = :UDR_Id`;

    const replacements = {
      replacements: {
        route: "UPDATE_STORE",
        type: "UPDATE",
        UDR_Id: UDR_Id,
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
    if (results.length > 0) {
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

module.exports = { updateStore };
