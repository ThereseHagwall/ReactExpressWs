import express, { Request, Response, Router } from "express";
import Product from '../models/ProductModel';

var router = express.Router();

//HÄMTAR ALLA PRODUKTER
router.get('/products', async (req: Request, res: Response) => {
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


//SKAPAR NY PRODUKT
router.post('/add', async (req: Request, res: Response) => {
  try {
    const newProduct = new Product({
    productName: 'Mankini',
    productPrice: 200,
    size: 'L',
    quantity: 5,
    });
    const createdProduct = await newProduct.save();
    console.log('Product created:', createdProduct);
    res.json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'An error occurred while creating the product' });
  }
});

export default router;