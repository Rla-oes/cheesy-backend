module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "Menu",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  Menu.associate = (models) => {
    Menu.hasMany(models.SavedMenu, { foreignKey: "menu_id" });
  };

  return Menu;
};
