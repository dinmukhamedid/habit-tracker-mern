const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/AuthController');
const authMiddleware = require('../middleware/authMiddleware');

// Тіркелу
router.post('/register', register);

// Кіру
router.post('/login', login);

// Профильді алу (қорғалған маршрут)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // AuthController-ден User моделін импорттаған болсақ жақсы, бірақ егер жоқ болса, осылай жасауға болады:
    const User = require('../models/User');

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Пайдаланушы табылмады' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
});

module.exports = router;
