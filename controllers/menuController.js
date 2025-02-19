const db = require('../models'); // models 폴더에서 DB 가져오기
const Menu = db.Menu; // Menu 모델 사용

//랜덤 메뉴
const getRandomMenu = async (req, res) => {
    try {
        const randomMenu = await Menu.findOne({
            order: [sequelize.literal("RAND()")], // 랜덤 정렬
        });

        if (!randomMenu) {
            return res.status(404).json({ message: "메뉴가 없습니다." });
        }

        res.json(randomMenu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류" });
    }
};

// 카테고리별 랜덤 메뉴 선택
exports.getRandomMenuByCategory = async (req, res) => {
    const { category } = req.params;  // URL 파라미터로 카테고리 받음
    try {
        const randomMenu = await db.Menu.findOne({
            where: { category },  // 카테고리 필터
            order: db.Sequelize.fn('RAND')  // 랜덤으로 하나 선택
        });
        if (randomMenu) {
            res.json(randomMenu);
        } else {
            res.status(404).send('이 카테고리에 메뉴가 없습니다.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('오류');
    }
};

// 메뉴 목록 조회 (GET /api/menus)
exports.getMenus = async (req, res) => {
    try {
        const menus = await Menu.findAll(); // 모든 메뉴 가져오기
        res.status(200).json(menus); // JSON 형태로 응답
    } catch (error) {
        console.error(" 메뉴 목록 조회 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

// 특정 메뉴 조회 (GET /api/menus/:id)
exports.getMenu = async (req, res) => {
    const { id } = req.params; // URL 파라미터에서 메뉴 ID 가져오기
    try {
        const menu = await Menu.findOne({ where: { id } }); // 메뉴 ID로 찾기
        if (!menu) {
            return res.status(404).json({ message: "메뉴가 존재하지 않습니다." });
        }
        res.status(200).json(menu); // 메뉴 응답
    } catch (error) {
        console.error(" 메뉴 조회 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

// 메뉴 추가 (POST /api/menus)
exports.addMenu = async (req, res) => {
    const { name, category_id } = req.body; // 요청 본문에서 메뉴 이름과 카테고리 ID 가져오기
    try {
        const newMenu = await Menu.create({ name, category_id }); // 새로운 메뉴 생성
        res.status(201).json({ message: "메뉴 추가 성공", menu: newMenu });
    } catch (error) {
        console.error(" 메뉴 추가 오류:", error);
        res.status(500).json({ message: "메뉴 추가 실패" });
    }
};
