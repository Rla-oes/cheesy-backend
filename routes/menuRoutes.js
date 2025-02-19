const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// 전체 메뉴에서 랜덤으로 선택
router.get('/random', menuController.getRandomMenu);

// 카테고리별 랜덤 메뉴 선택
router.get('/random/:category', menuController.getRandomMenuByCategory);

module.exports = router;