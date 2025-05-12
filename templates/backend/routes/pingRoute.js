const express = require("express");
const router = express.Router();
const { ping } = require("../backend/controllers/pingController");

router.get("/", ping);

module.exports = router;
