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
    });

    SavedMenu.associate = (models) => {
        SavedMenu.belongsTo(models.User, { foreignKey: 'user_id' }); 
    };

    return SavedMenu;
};