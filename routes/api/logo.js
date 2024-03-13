const express = require("express");
const router = express.Router();

const { updateLogo, getLogo } = require("../../controllers/updateLogoController");

router.post("/update", updateLogo).post('/get', getLogo);

module.exports = router;