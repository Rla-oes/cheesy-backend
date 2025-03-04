const express = require("express");
const cors = require("cors");
const path = require("path");
const savedMenuRoutes = require("./routes/savedMenuRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

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

// API 라우트 설정
app.use("/api/saved-menus", savedMenuRoutes);
app.use("/api/users", userRoutes);

// React 정적 파일 제공
const reactBuildPath = path.join(__dirname, "../cheesy-frontend/build");
app.use(express.static(reactBuildPath));

// index.html로 연결
app.get("*", (req, res) => {
  res.sendFile(path.join(reactBuildPath, "index.html"));
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
