const db = require("../models");
const { SavedMenu, Menu } = db;
const { v4: uuidv4 } = require("uuid");

exports.createAnonymousId = (req, res) => {
    const anonymous_id = uuidv4();
    res.status(200).json({ anonymous_id });
};


exports.saveMenu = async (req, res) => {
    const { anonymous_id, menu_id } = req.body;

    if (!anonymous_id || !menu_id) {
        return res.status(400).json({ message: "anonymous_id와 menu_id가 필요합니다." });
    }

    try {
        // 메뉴 존재 여부 확인
        const menu = await Menu.findByPk(menu_id);
        if (!menu) {
            return res.status(404).json({ message: "존재하지 않는 메뉴입니다." });
        }

        const savedMenu = await SavedMenu.create({
            anonymous_id,
            menu_id,
        });
        res.status(201).json({ message: "메뉴 저장 성공!", savedMenu });
    } catch (error) {
        console.error("메뉴 저장 실패:", error);
        res.status(500).json({ message: "메뉴 저장 실패ㅠㅠ" });
    }
};

exports.getSavedMenus = async (req, res) => {
    const { anonymous_id } = req.query;

    if (!anonymous_id) {
        return res.status(400).json({ message: "anonymous_id가 필요합니다." });
    }

    try {
        const savedMenus = await SavedMenu.findAll({
            where: { anonymous_id },
            include: [
                {
                    model: Menu,
                    attributes: ["name", "category"],
                },
            ],
        });

        res.status(200).json(savedMenus);
    } catch (error) {
        console.error("저장된 메뉴 불러오기 실패:", error);
        res.status(500).json({ message: "저장된 메뉴 불러오기 실패ㅠㅠ" });
    }
};

exports.deleteSavedMenu = async (req, res) => {
    const { id } = req.params;
    const { anonymous_id } = req.body;

    if (!id || !anonymous_id) {
        return res.status(400).json({ message: "id와 anonymous_id가 필요합니다." });
    }

    try {
        // 삭제할 메뉴 찾기
        const menu = await SavedMenu.findOne({ where: { id, anonymous_id } });

        if (!menu) {
            return res.status(404).json({ message: "메뉴를 찾을 수 없습니다." });
        }

        // 메뉴 삭제
        await menu.destroy();
        res.status(200).json({ message: "메뉴 삭제 성공!", deleted_menu: menu });
    } catch (error) {
        console.error("메뉴 삭제 실패:", error);
        res.status(500).json({ message: "메뉴 삭제 실패ㅠㅠ" });
    }
};
