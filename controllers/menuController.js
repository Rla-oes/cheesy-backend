const db = require("../models"); // models 폴더에서 DB 가져오기
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
  const { category } = req.params; // URL 파라미터로 카테고리 받음
  try {
    const randomMenu = await db.Menu.findOne({
      where: { category }, // 카테고리 필터
      order: db.Sequelize.fn("RAND"), // 랜덤으로 하나 선택
    });
    if (randomMenu) {
      res.json(randomMenu);
    } else {
      res.status(404).send("이 카테고리에 메뉴가 없습니다.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("오류");
  }
};
