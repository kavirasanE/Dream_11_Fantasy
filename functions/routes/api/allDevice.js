const express = require("express");
const router = express.Router();

const {
  getAllDeviceForApproval,
  updateApproval,
  getAllDevice,
} = require("../../controllers/allDeviceController");

router
  .get("/approval", getAllDeviceForApproval)
  .get("/getall", getAllDevice)
  .post("/updateapproval", updateApproval)

module.exports = router;
