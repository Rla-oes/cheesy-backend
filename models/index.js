const { Sequelize } = require("sequelize");
require("dotenv").config(); 

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.SavedMenu = require("./savedMenu")(sequelize, Sequelize);

db.User.hasMany(db.SavedMenu, { foreignKey: "user_id" });
db.SavedMenu.belongsTo(db.User, { foreignKey: "user_id" });

module.exports = db;

db.sequelize.sync()
    .then(() => {
        console.log("Database synced");
    })
    .catch((error) => {
        console.error("Failed to sync database:", error);
    });