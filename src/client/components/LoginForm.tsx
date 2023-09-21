// LoginForm.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Importera useAuth-hook

interface FormData {
  userName: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    password: '',
  });

  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (formData.userName !== '' && formData.password !== '') {
      login(); 
      navigate('/admin');
    } else {
      console.error('Inloggning misslyckades');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label="Användarnamn"
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <TextField
          label="Lösenord"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Button type="submit" variant="contained" color="primary">
          Logga in
        </Button>
      </div>
    </form>
  );
}
