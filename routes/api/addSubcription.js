const express = require("express");
const router = express.Router();

const { getSubcriptionInfo } = require("../../controllers/addSubcriptionController");

router.get("/", getSubcriptionInfo);

module.exports = router;
