const db = require("../models");
const { SavedMenu, Menu, User } = db;

// 랜덤으로 선택된 메뉴 저장 기능
exports.saveMenu = async (req, res) => {
  const { anonymous_id, menu_id } = req.body;

  if (!anonymous_id || !menu_id) {
    return res
      .status(400)
      .json({ message: "anonymous_id와 menu_id가 필요합니다." });
  }

  try {
    // anonymous_id로 User 찾기
    const user = await User.findOne({ where: { anonymous_id } });
    if (!user) {
      return res.status(404).json({ message: "사용자가 존재하지 않습니다." });
    }

    // 메뉴 존재 여부 확인
    const menu = await Menu.findByPk(menu_id);
    if (!menu) {
      return res.status(404).json({ message: "존재하지 않는 메뉴입니다." });
    }

    // 메뉴 저장
    const savedMenu = await SavedMenu.create({
      user_id: user.id,
      menu_id,
    });

    res.status(201).json({ message: "메뉴 저장 성공!", savedMenu });
  } catch (error) {
    console.error("메뉴 저장 실패:", error);
    res.status(500).json({ message: "메뉴 저장 실패ㅠㅠ" });
  }
};

// 저장한 메뉴 조회
exports.getSavedMenus = async (req, res) => {
  const { anonymous_id } = req.query;

  if (!anonymous_id) {
    return res.status(400).json({ message: "anonymous_id가 필요합니다." });
  }

  try {
    const user = await User.findOne({
      where: { anonymous_id },
    });

    if (!user) {
      return res.status(404).json({ message: "사용자가 존재하지 않습니다." });
    }

    const savedMenus = await SavedMenu.findAll({
      where: { user_id: user.id },
      include: [
        {
          model: Menu,
          attributes: ["id", "name", "category"],
        },
      ],
    });

    console.log("📋 savedMenus:", savedMenus);
    res.status(200).json(savedMenus);
  } catch (error) {
    console.error("저장된 메뉴 불러오기 실패:", error);
    res.status(500).json({ message: "저장된 메뉴 불러오기 실패ㅠㅠ" });
  }
};

// 저장한 메뉴 삭제
exports.deleteSavedMenu = async (req, res) => {
  const { id } = req.params;
  const { anonymous_id } = req.body;

  if (!id || !anonymous_id) {
    return res.status(400).json({ message: "id와 anonymous_id가 필요합니다." });
  }

  try {
    const user = await User.findOne({ where: { anonymous_id } });
    if (!user) {
      return res.status(404).json({ message: "사용자가 존재하지 않습니다." });
    }

    const menu = await SavedMenu.findOne({ where: { id, user_id: user.id } });

    if (!menu) {
      return res.status(404).json({ message: "메뉴를 찾을 수 없습니다." });
    }

    await menu.destroy();
    res.status(200).json({ message: "메뉴 삭제 성공!", deleted_menu: menu });
  } catch (error) {
    console.error("메뉴 삭제 실패:", error);
    res.status(500).json({ message: "메뉴 삭제 실패ㅠㅠ" });
  }
};
