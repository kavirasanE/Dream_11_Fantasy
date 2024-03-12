const express = require("express");
const router = express.Router();

const {updateStore} = require("../../controllers/updateStoreController");

router.post("/", updateStore);

module.exports = router;