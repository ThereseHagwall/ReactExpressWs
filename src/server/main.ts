import {config} from 'dotenv';
config();
import express, {Request, Response} from "express";
import ViteExpress from "vite-express";
import mongoose from 'mongoose';
import Product from "./models/Product"
import userRouter from './routes/userRoutes'

const app = express();
// const userRouter = require('./routes/userRoutes');

app.use(express.json());
app.use('/user', userRouter);

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
    productName: 'Blubb',
    productPrice: 100,
    size: 'S',
    quantity: 2,
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

