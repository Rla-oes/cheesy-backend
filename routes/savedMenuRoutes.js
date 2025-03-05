const express = require("express");
const {
  saveMenu,
  getSavedMenus,
  deleteSavedMenu,
} = require("../controllers/savedMenuController");

const router = express.Router();

router.post("/", saveMenu);
router.get("/", getSavedMenus);
router.delete("/:id", deleteSavedMenu);

module.exports = router;
