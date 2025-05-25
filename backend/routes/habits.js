const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  getAggregate,  // aggregate функциясын контроллерден импортта
} = require('../controllers/habitController');

// Барлық маршруттар қорғалған
router.use(authMiddleware);

// CRUD маршруттары
router.get('/', getHabits);
router.post('/', createHabit);
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);

// Aggregate маршруты
router.get('/aggregate', getAggregate);

module.exports = router;
