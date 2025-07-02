const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/read", async (req, res) => {
  const { excelFile } = req.body;
  console.log(excelFile);
  res.render("index");
});

module.exports = router;
