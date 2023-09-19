import React, { useState, ChangeEvent, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Här kan du implementera logiken för att skicka inloggningsuppgifterna till din server
    console.log("Inloggning skickad:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label="E-post"
          type="email"
          name="email"
          value={formData.email}
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
