module.exports = (sequelize, DataTypes) => {
  const SavedMenu = sequelize.define("SavedMenu", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    saved_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  });

  SavedMenu.associate = (models) => {
    SavedMenu.belongsTo(models.User, { foreignKey: "user_id" });
    SavedMenu.belongsTo(models.Menu, { foreignKey: "menu_id" });
  };

  return SavedMenu;
};
