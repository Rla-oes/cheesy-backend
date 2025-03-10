const express = require("express");
const cors = require("cors");
const path = require("path");
const savedMenuRoutes = require("./routes/savedMenuRoutes");
const userRoutes = require("./routes/userRoutes");
const menuRoutes = require("./routes/menuRoutes");
require("dotenv").config();

const { sequelize } = require("./models");

const app = express();

app.use(
  cors({
    origin: [
      "https://port-0-cheesy-backend-m82xd98hcfdf2a62.sel4.cloudtype.app",
      "https://web-cheesy-frontend-m82xd98hcfdf2a62.sel4.cloudtype.app",
      "http://localhost:8080",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

const PORT = 8080;

// MariaDB 연결 확인
sequelize
  .authenticate()
  .then(() => {
    console.log("MariaDB에 연결되었습니다.");
  })
  .catch((err) => {
    console.error("MariaDB 연결 실패:", err.message);
    process.exit(1);
  });

app.use("/api/saved-menus", savedMenuRoutes);
app.use("/api", userRoutes);
app.use("/api/menus", menuRoutes);

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
