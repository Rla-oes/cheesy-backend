const { Sequelize } = require("sequelize");
const { Menu } = require("../models");

exports.getRandomMenuByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const menu = await Menu.findOne({
      where: { category: category },
      order: Sequelize.literal("rand()"),
    });

    if (!menu) {
      return res
        .status(404)
        .json({ message: "Menu not found for this category." });
    }

    return res.json(menu);
  } catch (error) {
    console.error("Error fetching menu:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
