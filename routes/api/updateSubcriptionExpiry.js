const express = require("express");
const router = express.Router();

const {updateExpiry} = require("../../controllers/subcriptionExpiryController");


router.post("/", updateExpiry);

module.exports = router;
