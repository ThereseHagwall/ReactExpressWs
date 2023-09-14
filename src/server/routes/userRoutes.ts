import express, { Request, Response, Router } from "express";
import User from '../models/UserModel';

var router = express.Router();

//HÄMTAR ALLA ANVÄNDARE
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    console.log('users', users);
    res.json(users);
  }
  catch (error) {
    console.error('Error finding users:', error);
    res.status(500).json({ error: 'An error occurred while finding the users' });
  }
})

//SKAPAR NY ANVÄNDARE
router.post('/add', async (req: Request, res: Response) => {
  try {
    const newUser = new User({
      name: 'Nizze'
    });
    const createdUser = await newUser.save();
    console.log('User created:', createdUser);
    res.json(createdUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
});

export default router;