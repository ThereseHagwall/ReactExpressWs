import {config} from 'dotenv';
config();
import express, {Request, Response} from "express";
import ViteExpress from "vite-express";
import mongoose from 'mongoose';
import User from "./models/User";

const app = express();

app.use(express.json());

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

app.post('/user', async (req: Request, res: Response) => {
  try {
    const newUser = new User({
      name: 'Häxa'
    });
    const createdUser = await newUser.save();
    console.log('User created:', createdUser);
    res.json(createdUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
});

mongoose.connect(process.env.VITE_REACT_APP_URL!).then(() => {
  console.log('Connected to db')
  ViteExpress.listen(app, 3000, () =>
    console.log("Server is listening on port 3000...")
  );
})

