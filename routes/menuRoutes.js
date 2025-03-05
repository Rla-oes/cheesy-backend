const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router.get("/random/:category", menuController.getRandomMenuByCategory);

module.exports = router;
