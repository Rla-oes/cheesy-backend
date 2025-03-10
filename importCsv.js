require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

const csvFilePath = path.join(__dirname, "data", "menus.csv");

fs.readFile(csvFilePath, "utf8", async (err, data) => {
  if (err) {
    console.error("파일을 읽는 중 오류 발생:", err);
    return;
  }

  const rows = data
    .split("\n")
    .map((row) => row.replace("\r", ""))
    .filter((row) => row.trim() !== "")
    .slice(1);

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

  let conn;
  try {
    conn = await pool.getConnection();
    const insertQuery =
      "INSERT INTO menus (id, name, category) VALUES (?, ?, ?)";

    for (const row of values) {
      await conn.query(insertQuery, row);
    }

    console.log("데이터 삽입 성공! 총", values.length, "행 추가됨");
  } catch (err) {
    console.error("데이터 삽입 중 오류 발생:", err);
  } finally {
    if (conn) conn.release();
    await pool.end();
  }
});
