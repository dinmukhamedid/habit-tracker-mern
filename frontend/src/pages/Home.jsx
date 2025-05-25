import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Title, Button, Group } from '@mantine/core';

export default function Home() {
  const token = localStorage.getItem('token');

  return (
    <Container size="sm" mt={50} style={{ textAlign: 'center' }}>
      <Title mb={30}>Habit Tracker-ге қош келдің!</Title>
      <Group position="center" spacing="md">
        {token ? (
          <>
            <Button component={Link} to="/profile">Профиль</Button>
            <Button onClick={() => {
              localStorage.removeItem('token');
              window.location.reload();
            }}>Шығу</Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/login">Кіру</Button>
            <Button component={Link} to="/register">Тіркелу</Button>
          </>
        )}
      </Group>
    </Container>
  );
}
