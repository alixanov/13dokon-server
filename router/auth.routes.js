// user.routes.js
const express = require('express');
const User = require('../module/user-schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
     try {
          const { login, password } = req.body;
          const existingUser = await User.findOne({ login });
          if (existingUser) {
               return res.status(400).json({ message: "Этот логин уже используется." });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = new User({ login, password: hashedPassword });
          await user.save();
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.status(201).json({ message: "Пользователь зарегистрирован", token });
     } catch (error) {
          res.status(500).json({ message: "Ошибка при регистрации", error });
     }
});

// Вход
router.post('/login', async (req, res) => {
     try {
          const { login, password } = req.body;
          const user = await User.findOne({ login });
          if (!user) {
               return res.status(400).json({ message: "Неверный логин или пароль" });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
               return res.status(400).json({ message: "Неверный логин или пароль" });
          }
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.json({ message: "Успешный вход", token });
     } catch (error) {
          res.status(500).json({ message: "Ошибка при авторизации", error });
     }
});

module.exports = router;
