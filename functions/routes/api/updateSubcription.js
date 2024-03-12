const express = require("express");
const router = express.Router();

const {updateSubcription} = require("../../controllers/updateSubcriptionController");


router.post("/", updateSubcription);

module.exports = router;
