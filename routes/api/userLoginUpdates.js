const express = require("express");
const router = express.Router();

const {
  addCahsier,
  updateUserLogin,
  deleteCashier, 
} = require("../../controllers/userLoginUpdateController");

router
  .post("/", addCahsier)
  .put("/", updateUserLogin)
  .delete("/", deleteCashier);

module.exports = router;
