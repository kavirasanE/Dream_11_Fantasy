const express = require("express");
const router = express.Router();

const {getUnits} = require("../../controllers/getUnitsController");


router.post("/", getUnits);

module.exports = router;
