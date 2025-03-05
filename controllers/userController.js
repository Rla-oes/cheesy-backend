const db = require("../models");
const { User } = db;
const { v4: uuidv4 } = require("uuid");

// 익명 사용자 생성
exports.createAnonymousId = async (req, res) => {
  const anonymous_id = uuidv4();

  try {
    const newUser = await User.create({
      anonymous_id,
    });

    res.status(200).json({ anonymous_id });
  } catch (error) {
    console.error("사용자 생성 실패:", error);
    res.status(500).json({ message: "사용자 생성 실패" });
  }
};

// 사용자 조회
exports.getUser = async (req, res) => {
  const { anonymous_id } = req.query;

  try {
    const user = await User.findOne({ where: { anonymous_id } });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("사용자 조회 실패:", error);
    res.status(500).json({ message: "Failed to get user" });
  }
};
