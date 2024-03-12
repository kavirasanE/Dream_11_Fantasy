const express = require("express");
const router = express.Router();

const {updateCredentials} = require("../../controllers/updateCredentialsController");

router.post("/", updateCredentials);

module.exports = router;