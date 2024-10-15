// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
     const token = req.headers['authorization'];
     if (!token) {
          return res.status(401).json({ message: "Нет токена, авторизация отклонена" });
     }

     try {
          const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Верифицируем токен
          req.user = decoded;
          next(); // Продолжаем выполнение запроса
     } catch (error) {
          res.status(401).json({ message: "Неверный токен" });
     }
};

module.exports = auth;
