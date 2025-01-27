const db = require("../models");
const SavedMenu = db.SavedMenu;

exports.saveMenu = async (req, res) => {
    const { anonymous_id, menu_id } = req.body;
    try {
        const savedMenu = await SavedMenu.create({
            user_id: anonymous_id, 
            menu_id,
    });
    res.status(200).json({ message: "메뉴 저장 성공!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "메뉴 저장 실패ㅠㅠ" });
    }
};

exports.getSavedMenus = async (req, res) => {
    const { anonymous_id } = req.query;
    try {
        const savedMenus = await SavedMenu.findAll({
            where: { user_id: anonymous_id },
            include: [
                {
                    model: db.Menu,
                    attributes: ["name", "category_name"],
                },
            ],
        });
        res.status(200).json(savedMenus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "저장된 메뉴 불러오기 실패ㅠㅠ" });
    }
};

exports.deleteSavedMenu = async (req, res) => {
    const { id } = req.params;
    try {
        const menu = await SavedMenu.destroy({ where: { id } });
        if (menu) {
            res.status(200).json({ message: "메뉴 삭제 성공!", deleted_menu: { id } });
        } else {
            res.status(404).json({ message: "메뉴를 찾을 수 없어용ㅠ" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "메뉴 삭제 실패ㅠㅠ" });
    }
};
