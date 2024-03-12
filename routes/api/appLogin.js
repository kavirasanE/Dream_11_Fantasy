const express = require("express");
const router = express.Router();

const {appLogin} = require("../../controllers/appLoginController");

router.post("/", appLogin);

module.exports = router;