const db = require('../models'); // models 폴더에서 DB 가져오기
const Category = db.Category;  // Category 모델 사용

// 카테고리 목록 조회 (GET /api/categories)
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll(); // 모든 카테고리 가져오기
        res.status(200).json(categories);  // JSON 형태로 응답
    } catch (error) {
        console.error(" 카테고리 조회 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

// 특정 카테고리 메뉴 조회 (GET /api/menus)
exports.getCategoryMenus = async (req, res) => {
    const { category_id } = req.query; // 쿼리에서 category_id 받기
    try {
        const category = await Category.findOne({ where: { id: category_id } }); // 카테고리 조회
        if (!category) {
            return res.status(404).json({ message: "카테고리가 존재하지 않습니다." });
        }
        const menus = await category.getMenus(); // 카테고리와 연결된 메뉴들 가져오기
        res.status(200).json(menus);
    } catch (error) {
        console.error(" 카테고리 메뉴 조회 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};
