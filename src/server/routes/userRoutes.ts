import express, { Request, Response, Router } from "express";
import User from '../models/UserModel';

var router = express.Router();

// INLOGGNING
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Felaktigt användarnamn eller lösenord' });
    }
    return res.json({ message: 'Inloggning lyckades', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Ett fel uppstod vid inloggningen' });
  }
});

export default router;
