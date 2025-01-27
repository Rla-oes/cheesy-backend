const express = require("express");
const {
    createAnonymousId,
    getSavedMenus,
    saveMenu,
    deleteSavedMenu,
} = require("../controllers/savedMenuController");

const router = express.Router();

router.get("/generate-anonymous-id", createAnonymousId); 
router.get("/", getSavedMenus); 
router.post("/", saveMenu); 
router.delete("/:id", deleteSavedMenu); 

module.exports = router;