import {config} from 'dotenv';
config();
import express, {Request, Response} from "express";
import ViteExpress from "vite-express";
import mongoose from 'mongoose';
import User from "./models/User";
import Product from "./models/Product"

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

app.get('/products', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    console.log('products', products);
    
    // Send the products as a JSON response
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    // Handle the error and send an appropriate response
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/product', async (req: Request, res: Response) => {
  try {
    const newProduct = new Product({
    productName: 'fan',
    productPrice: 100,
    size: 'S',
    });
    const createdProduct = await newProduct.save();
    console.log('Product created:', createdProduct);
    res.json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'An error occurred while creating the product' });
  }
});

mongoose.connect(process.env.VITE_REACT_APP_URL!).then(() => {
  console.log('Connected to db')
  ViteExpress.listen(app, 3000, () =>
    console.log("Server is listening on port 3000...")
  );
})

