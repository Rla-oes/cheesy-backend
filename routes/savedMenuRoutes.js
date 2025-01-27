const express = require("express");
const savedMenuController = require("../controllers/savedMenuController");
const router = express.Router();

router.post("/", savedMenuController.saveMenu);
router.get("/", savedMenuController.getSavedMenus);
router.delete("/:id", savedMenuController.deleteSavedMenu);

module.exports = router;