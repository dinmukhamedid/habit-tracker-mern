import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Title, Text, Button } from '@mantine/core';

export default function Profile() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setUser(res.data))
    .catch(() => setUser(null));
  }, [token]);

  if (!user) return <Container mt={50}><Text>Профиль жүктелуде...</Text></Container>;

  return (
    <Container mt={50}>
      <Title mb={20}>Профиль</Title>
      <Text><b>Аты:</b> {user.username}</Text>
      <Text><b>Email:</b> {user.email}</Text>
      <Button mt={20} onClick={() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }}>Шығу</Button>
    </Container>
  );
}
