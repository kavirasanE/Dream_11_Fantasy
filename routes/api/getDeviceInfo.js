const express = require("express");
const router = express.Router();

const {getDeviceInfo} = require("../../controllers/getDeviceInfoController");

router.post("/", getDeviceInfo);

module.exports = router;