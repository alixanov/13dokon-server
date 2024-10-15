// router/cart.routes.js
const express = require('express');
const { addToCart } = require('../controllers/crud.control');
const auth = require("../middleware/auth.middleware"); // Подключаем middleware для аутентификации

const router = express.Router();

router.post('/add', auth, addToCart); // Защищенный маршрут

module.exports = router;
