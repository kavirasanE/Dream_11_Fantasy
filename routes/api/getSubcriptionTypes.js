const express = require("express");
const router = express.Router();

const {getSubcriptionTypes,getSubType} = require("../../controllers/getSubcriptionTypesController");


router.post("/", getSubcriptionTypes).get('/',getSubType);

module.exports = router;
