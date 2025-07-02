const express = require("express");
const router = express.Router();
const xlsx = require('../lib/xlsx_populate');

router.get("/", async (req, res) => {
  
  res.render("index");
});

module.exports = router;
