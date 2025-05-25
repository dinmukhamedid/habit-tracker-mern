import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { TextInput, PasswordInput, Button, Container, Title, Notification } from '@mantine/core';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Қате болды');
    }
  };

  return (
    <Container size="xs" mt={50}>
      <Title align="center" mb={20}>Тіркелу</Title>
      {error && <Notification color="red" mb={15}>{error}</Notification>}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Пайдаланушы аты"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          mb={15}
        />
        <TextInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          mb={15}
        />
        <PasswordInput
          label="Құпия сөз"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          mb={15}
        />
        <Button type="submit" fullWidth>Тіркелу</Button>
      </form>
      <div style={{ marginTop: 15, textAlign: 'center' }}>
        <Link to="/login">Кіру</Link>
      </div>
    </Container>
  );
}
