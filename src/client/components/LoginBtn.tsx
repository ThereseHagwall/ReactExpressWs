import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';

const navigate = useNavigate();

export default function LoginBtn() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('isLoggedIn'));

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/')
  };

  return (
    <Stack direction="row" spacing={2}>
      {isLoggedIn ? (
        <Button variant="contained" onClick={handleLogout}>
          Logga ut
        </Button>
      ) : (
        <Link to="/login">
          <Button variant="contained">ADMIN</Button>
        </Link>
      )}
    </Stack>
  );
}
