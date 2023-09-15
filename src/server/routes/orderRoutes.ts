import express, { Request, Response, Router } from "express";
import Order from "../models/OrderModel";
var router = express.Router();

//SKAPA NY ORDER
router.post('/add', async (req: Request, res: Response) => {
  try {
    const newOrder = new Order({
      products: [{
        productName: 'Tröja',
        productPrice: 200,
        size: 'XL',
        quantity: 2,
      },
      {
        productName: 'Byxa',
        productPrice: 250,
        size: 'L',
        quantity: 4,
      }],
      quantity: 2,
      customerName: 'Hans Petter',
    });
    newOrder.save()
      .then((savedOrder) => {
        console.log('order sparad', savedOrder);
      })
  }
  catch (err) {
    console.error("Error", err)
  }
})

//Hämta alla ordrar
router.get('/orders', async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    console.log('orders', orders);
    // Send the products as a JSON response
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Handle the error and send an appropriate response
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;