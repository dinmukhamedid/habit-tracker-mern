const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// .env ішіндегі мәліметтерді қолдану
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth маршруттарын қосу
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Habit маршруттарын қосу (қорғалған)
const habitRoutes = require('./routes/habits');
app.use('/api/habits', habitRoutes);

// Бастапқы маршрут (тест үшін)
app.get('/', (req, res) => {
  res.send('Habit Tracker API is running...');
});

// MongoDB-мен қосылу
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB-ге қосылды');
    // Серверді қосу
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Сервер портта жұмыс істеп тұр: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB-ге қосыла алмады:', err.message);
  });
