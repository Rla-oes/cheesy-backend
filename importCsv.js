require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const csvFilePath = path.join(__dirname, "data", "menus.csv");

fs.readFile(csvFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("파일을 읽는 중 오류 발생:", err);
    return;
  }

  // CSV 데이터를 줄 단위로 나누기 & \r 제거
  const rows = data
    .split("\n")
    .map((row) => row.replace("\r", ""))
    .filter((row) => row.trim() !== "")
    .slice(1);

  if (rows.length === 0) {
    console.error("CSV 파일에 유효한 데이터가 없습니다.");
    return;
  }

  const values = rows
    .map((row) => {
      const columns = row.split(",");
      return columns.length === 3 ? columns : null;
    })
    .filter(Boolean);

  if (values.length === 0) {
    console.error("올바른 데이터가 없습니다.");
    return;
  }

  // MySQL에 데이터 삽입 (id 포함)
  const insertQuery = "INSERT INTO menus (id, name, category) VALUES ?";
  connection.query(insertQuery, [values], (err, result) => {
    if (err) {
      console.error("데이터 삽입 중 오류 발생:", err);
    } else {
      console.log("데이터 삽입 성공!:", result.affectedRows, "행 추가됨");
    }
    connection.end();
  });
});
