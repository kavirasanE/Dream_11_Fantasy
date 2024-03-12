const express = require("express");
const router = express.Router();

const {registerDevice} = require("../../controllers/registerDeviceController");

router.post("/", registerDevice);

module.exports = router;