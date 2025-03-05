const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mariadb",
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.SavedMenu = require("./savedMenu")(sequelize, Sequelize);
db.Menu = require("./menu")(sequelize, Sequelize);

db.User.hasMany(db.SavedMenu, { foreignKey: "user_id" });
db.SavedMenu.belongsTo(db.User, { foreignKey: "user_id" });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;

db.sequelize
  .sync()
  .then(() => {
    console.log("MariaDB 연결 성공 및 동기화 완료");
  })
  .catch((error) => {
    console.error("MariaDB 연결 실패:", error);
  });
