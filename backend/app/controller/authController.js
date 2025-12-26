const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config.js');

exports.register = async (req, res) => {
    const { password, username } = req.body;

    try {
        const existing = await db.user.findOne({
            where: { username: username }
        });

        if (existing) {
            return res.status(400).json({ message: "Пользователь уже существует" });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            username: username,
            password: hash
        });

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || "secret_key",
            { expiresIn: "1d" }
        );

        res.json({ token });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Ошибка регистрации" });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.user.findOne({
            where: { username: username }
        });

        if (!user) {
            return res.status(400).json({ message: "Неверный логин/пароль" });
        }

        const ok = await bcrypt.compare(password, user.password);

        if (!ok) {
            return res.status(400).json({ message: "Неверный логин/пароль" });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || "secret_key",
            { expiresIn: "1d" }
        );

        res.json({ token });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Ошибка входа" });
    }
};