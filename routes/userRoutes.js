const express = require("express");
const { createAnonymousId, getUser } = require("../controllers/userController");

const router = express.Router();

router.get("/generate-anonymous-id", createAnonymousId);
router.get("/user", getUser);

module.exports = router;
