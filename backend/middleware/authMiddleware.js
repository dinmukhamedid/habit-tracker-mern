const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Токен бар ма тексереміз
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Авторизация қажет' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Токенді тексеру
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // қолданушы ID-ны кейін маршруттарда қолданамыз
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Токен жарамсыз немесе уақыты өткен' });
  }
};

module.exports = authMiddleware;
