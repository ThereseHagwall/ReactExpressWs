import express, { Request, Response } from "express";
import Product from '../models/ProductModel';
import productModel from "../models/ProductModel";
import ProductSize from "../models/ProductSizeModel";

var router = express.Router();

//HÄMTAR ALLA PRODUKTER
router.get('/products', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    // Send the products as a JSON response
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    // Handle the error and send an appropriate response
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// HÄMTA EN PRODUKT
router.get("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(401).json({ error: 'cant find any product' });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(404)
      .json({ error: 'erorr' });
  }
});

/// SKAPAR NY PRODUKT
router.post('/add', async (req: Request, res: Response) => {
  try {
    const newProduct = new Product({
      productName: 'Darth Vader',
      productPrice: 65,
      productDescription: 'En bekväm t-shirt med Darth Vader.',
      productMaterial: 'Bomull'
    });
    const createdProduct = await newProduct.save();
    const sizes = ['S', 'M', 'L', 'XL'];
    const productSizes = [];

    for (const sizeName of sizes) {
      const productSize = new ProductSize({
        productId: createdProduct._id,
        sizeName: sizeName,
        quantity: Math.floor(Math.random() * 10)
      });
      productSizes.push(productSize);
    }

    // Spara produktstorlekarna
    await ProductSize.insertMany(productSizes);
    console.log('Product created:', createdProduct);
    res.json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'An error occurred while creating the product' });
  }
});



//Hämta produktstorlekarna
router.get('/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    const productSizes = await ProductSize.find({ productId });
    res.json(productSizes);
  } catch (error) {
    console.error('Error fetching product sizes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;




export default router;