import React, { useState, ChangeEvent, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; // Importera useNavigate

interface FormData {
  userName: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    password: "",
  });

  const navigate = useNavigate(); // Använd useNavigate för att hantera navigering

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // Gör en POST-förfrågan till din server med användarnamn och lösenord
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Om inloggningen lyckas, gör något här, t.ex. lagra användarinformation i en session
        const data = await response.json();
        console.log("Inloggning lyckades:", data);

        // Navigera till den önskade sidan, till exempel "/admin"
        navigate("/admin");
      } else {
        // Om inloggningen misslyckas, hantera felmeddelandet här
        console.error("Inloggning misslyckades");
      }
    } catch (error) {
      console.error("Fel vid inloggning:", error);
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
