const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const { Menu } = require("../models");

// 기존 라우트
router.get("/random/:category", menuController.getRandomMenuByCategory);

// 테스트용 라우트 추가
router.get("/debug/menus", async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.json(menus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB에서 메뉴 가져오기 실패" });
  }
});

// 디코딩 테스트 라우트
router.get("/test/:category", (req, res) => {
  const raw = req.params.category;
  const decoded = decodeURIComponent(raw);
  res.json({ raw, decoded });
});

module.exports = router;
