const connectDB = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

const addCahsier = async (req, res) => {
  try {
    let { UDR_Id, userName, password, email, mobile, fullName } = req.body;
    if (!UDR_Id || !userName || !password || !mobile || !fullName) {
      return res.status(400).json({
        message: "Missing required field",
        requiredFields: [
          "UDR_Id - UDR_Id is the object key which you receive in getDevice info or after registering the device",
          "userName",
          "password",
          "email",
          "mobile",
          "fullName"
        ],
      });
    }

    const statement = `EXEC USP_Mobile_App @route = :route, @type = :type, @UserName = :UserName, @UserPassword = :UserPassword, @logintype = :logintype, @email = :email, @mobile = :mobile, @UDR_Id = :UDR_Id, @fullName = :fullName`;

    const replacements = {
      replacements: {
        route: "CASHIER",
        type: "ADD_CASHIER",
        UserName: userName,
        UserPassword: password,
        logintype: "Cashier",
        email: email,
        mobile: mobile,
        UDR_Id: UDR_Id,
        fullName: fullName
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
          .json({ message: "Default username change required!" });
      }
      if (results[0].RESULTS == "Same username already exists!") {
        return res
          .status(400)
          .json({ message: "Same username already exists!" });
      }
      res.status(200).json({ message: "Cashier added!", results: results });
    } else {
      res.status(400).json({ message: "Invalid entry" });
    }
    // res.status(400).json({message:"No active device found with this _id key. _id is the key _id which you receive in getDevice info",});
    // res.status(400).json({message:"The device is not yet approved! Please ask the admin to validate and approve your request",});
    // res.status(200).json({ message: "Device userName and password updated successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const updateUserLogin = async (req, res) => {
  try {
    let { UDR_Id, Login_User_Id, userName, password,mobile, fullName } = req.body;
    if (!Login_User_Id || !userName || !password || !UDR_Id || !mobile) {
      return res.status(400).json({
        message: "Missing required field",
        requiredFields: [
          "UDR_Id - UDR_Id is the object key which you receive in getDevice info or after registering the device",
          "Login_User_Id - Login_User_Id is the object key which you receive when user login",
          "userName",
          "password",
          "mobile"
        ],
      });
    }

    const statement = `EXEC USP_Mobile_App @route = :route, @type = :type, @action = :action, @UserName = :UserName, @fullname = :fullname, @UserPassword = :UserPassword, @mobile = :mobile, @getid = :getid, @UDR_Id = :UDR_Id`;

    const replacements = {
      replacements: {
        route: "UPDATE_LOGIN",
        type: "UPDATE",
        action: "EDIT",
        UserName: userName,
        UserPassword: password,
        mobile: mobile,
        fullname: fullName,
        getid: Login_User_Id,
        UDR_Id: UDR_Id,
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
          .json({ message: "Default username change required!" });
      }
      if (results[0].RESULTS == "Same username already exists!") {
        return res
          .status(400)
          .json({ message: "Same username already exists!" });
      }
      res.status(200).json({ message: "Edit success!", results: results });
    } else {
      res.status(400).json({ message: "Invalid entry" });
    }
    // res.status(400).json({message:"No active device found with this _id key. _id is the key _id which you receive in getDevice info",});
    // res.status(400).json({message:"The device is not yet approved! Please ask the admin to validate and approve your request",});
    // res.status(200).json({ message: "Device userName and password updated successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const deleteCashier = async (req, res) => {
  try {
    let { UDR_Id, Login_User_Id } = req.body;
    if (!Login_User_Id || !UDR_Id) {
      return res.status(400).json({
        message: "Missing required field",
        requiredFields: [
          "UDR_Id - UDR_Id is the object key which you receive in getDevice info or after registering the device",
          "Login_User_Id - Login_User_Id is the object key which you receive when user login",
        ],
      });
    }

    const statement = `EXEC USP_Mobile_App @route = :route, @type = :type, @action = :action, @getid = :getid, @UDR_Id = :UDR_Id`;

    const replacements = {
      replacements: {
        route: "UPDATE_LOGIN",
        type: "UPDATE",
        action: "DELETE",
        getid: Login_User_Id,
        UDR_Id: UDR_Id,
      },
      type: QueryTypes.SELECT,
    };
    const results = await connectDB.query(statement, replacements);
    if (results.length > 0) {
      if (results[0].RESULTS == "No device found with this ID!") {
        return res.status(400).json({ message: "No device found with this ID!" });
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
          .json({ message: "Default username change required!" });
      }
      if (results[0].RESULTS == "Same username already exists!") {
        return res
          .status(400)
          .json({ message: "Same username already exists!" });
      }
      if (results[0].RESULTS == "Delete successful!") {
        return res.status(400).json({ message: "Delete successful!" });
      }
    } else {
      return res.status(400).json({ message: "Invalid entry" });
    }
    // res.status(400).json({message:"No active device found with this _id key. _id is the key _id which you receive in getDevice info",});
    // res.status(400).json({message:"The device is not yet approved! Please ask the admin to validate and approve your request",});
    // res.status(200).json({ message: "Device userName and password updated successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = { addCahsier, updateUserLogin, deleteCashier };
