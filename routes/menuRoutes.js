const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const { Menu } = require("../models");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// ✅ 랜덤 메뉴 라우트
router.get("/random/:category", menuController.getRandomMenuByCategory);

// ✅ 디버깅용 - 모든 메뉴 보기
router.get("/debug/menus", async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.json(menus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB에서 메뉴 가져오기 실패" });
  }
});

// ✅ 디코딩 테스트
router.get("/test/:category", (req, res) => {
  const raw = req.params.category;
  const decoded = decodeURIComponent(raw);
  res.json({ raw, decoded });
});

// ✅ 샘플 메뉴 추가 테스트
router.post("/add-sample", async (req, res) => {
  try {
    const newMenu = await Menu.create({
      name: "테스트메뉴",
      category: "한식",
    });
    res.json({ message: "샘플 메뉴 추가 성공", menu: newMenu });
  } catch (err) {
    console.error("샘플 메뉴 추가 에러:", err);
    res.status(500).json({ error: "샘플 메뉴 추가 실패" });
  }
});

// ✅ CSV import API
router.post("/import", async (req, res) => {
  const results = [];
  const csvPath = path.join(__dirname, "../data/menus.csv");

  if (!fs.existsSync(csvPath)) {
    return res.status(404).json({ error: "CSV 파일이 없습니다." });
  }

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on("data", (data) => {
      results.push({
        name: data.name,
        category: data.category,
      });
    })
    .on("end", async () => {
      try {
        await Menu.bulkCreate(results);
        res.json({ message: "CSV import 완료", count: results.length });
      } catch (err) {
        console.error("CSV import 실패:", err);
        res.status(500).json({ error: "데이터 import 실패" });
      }
    });
});

module.exports = router;
