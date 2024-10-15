const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
     const token = req.headers['authorization'];
     if (!token) {
          return res.status(403).json({ message: 'Нет токена, авторизация отклонена' });
     }

     try {
          const decoded = jwt.verify(token, 'secret_key');
          req.user = decoded;
          next();
     } catch (error) {
          res.status(401).json({ message: 'Неверный токен' });
     }
};

module.exports = auth;
