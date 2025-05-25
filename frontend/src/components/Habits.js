import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const API_URL = 'http://localhost:5000/api/habits';

const Habits = () => {
  const { theme, toggleTheme } = useTheme();

  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [aggregateResult, setAggregateResult] = useState(null);

  // Habits алу
  const fetchHabits = async () => {
    try {
      const res = await axios.get(API_URL);
      setHabits(res.data);
    } catch (err) {
      console.error('Error fetching habits', err);
    }
  };

  // Aggregate нәтижесін алу (мысалы, барлық habit-тер саны)
  const fetchAggregate = async () => {
    try {
      const res = await axios.get(`${API_URL}/aggregate`); // Сіздің backend-тағы aggregate маршруты болуы керек
      setAggregateResult(res.data);
    } catch (err) {
      console.error('Error fetching aggregate data', err);
    }
  };

  useEffect(() => {
    fetchHabits();
    fetchAggregate();
  }, []);

  // Жаңа habit қосу
  const addHabit = async () => {
    if (!newHabit.trim()) return;
    try {
      await axios.post(API_URL, { name: newHabit });
      setNewHabit('');
      fetchHabits();
      fetchAggregate();
    } catch (err) {
      console.error('Error adding habit', err);
    }
  };

  // Habit жою
  const deleteHabit = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchHabits();
      fetchAggregate();
    } catch (err) {
      console.error('Error deleting habit', err);
    }
  };

  // Memo арқылы жаттықтыру (compute-intensive болса)
  const habitsCount = useMemo(() => habits.length, [habits]);

  return (
    <div style={{ 
      padding: 20, 
      backgroundColor: theme === 'dark' ? '#222' : '#eee', 
      color: theme === 'dark' ? '#eee' : '#222',
      minHeight: '100vh'
    }}>
      <button onClick={toggleTheme}>
        Тақырып ауыстыру (Қазіргі: {theme})
      </button>

      <h1>Habit Tracker</h1>

      <input 
        type="text" 
        value={newHabit} 
        onChange={(e) => setNewHabit(e.target.value)} 
        placeholder="Жаңа habit жазу..." 
      />
      <button onClick={addHabit}>Қосу</button>

      <h2>Барлық habit-тер ({habitsCount})</h2>
      <ul>
        {habits.map(habit => (
          <li key={habit._id}>
            {habit.name} 
            <button onClick={() => deleteHabit(habit._id)}>Жою</button>
          </li>
        ))}
      </ul>

      <h2>Aggregate нәтиже</h2>
      <pre>{JSON.stringify(aggregateResult, null, 2)}</pre>
    </div>
  );
};

export default Habits;
