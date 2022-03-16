const axios = require("axios");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
