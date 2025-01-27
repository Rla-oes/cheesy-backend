const db = require("../models");
const User = db.User;

exports.createUser = async (req, res) => {
    const { anonymous_id } = req.body; 
    try {
        const newUser = await User.create({
            anonymous_id,
        });
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create user" });
    }
};

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
        console.error(error);
        res.status(500).json({ message: "Failed to get user" });
    }
};