const Habit = require('../models/Habit');

// Барлық habit-терді алу (қолданушыға қатысты)
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    res.json(habits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};

// Жаңа habit құру
const createHabit = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title міндетті' });
    }

    const newHabit = new Habit({
      title,
      user: req.user.id,
    });
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};

// Habit жаңарту
const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user.id });
    if (!habit) {
      return res.status(404).json({ message: 'Habit табылмады' });
    }
    habit.title = req.body.title || habit.title;
    await habit.save();
    res.json(habit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};

// Habit жою
const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!habit) {
      return res.status(404).json({ message: 'Habit табылмады' });
    }
    res.json({ message: 'Habit жойылды' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};

// Aggregate (habit-тердің жалпы саны)
const getAggregate = async (req, res) => {
  try {
    const result = await Habit.aggregate([
      { $match: { user: req.user.id } },
      { $group: { _id: null, totalHabits: { $sum: 1 } } },
    ]);
    res.json(result[0] || { totalHabits: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  getAggregate,
};
