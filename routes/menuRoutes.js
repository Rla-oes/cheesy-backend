const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router.get("/random/:category", menuController.getRandomMenuByCategory);
router.get("/test/:category", (req, res) => {
  const raw = req.params.category;
  const decoded = decodeURIComponent(raw);
  res.json({ raw, decoded });
});

module.exports = router;
