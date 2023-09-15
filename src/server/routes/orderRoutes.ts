import express, { Request, Response, Router } from "express";
import Order from "../models/OrderModel";
import orderModel from "../models/OrderModel";
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
    const createOrder = await newOrder.save()
    console.log('createOrder', createOrder);
    res.json(createOrder);
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

router.get("/orders/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(401).json({ error: 'cant find any order' });
    }
    res.status(200).json(order);
  } catch (error) {
    res
      .status(404)
      .json({ error: 'erorr' });
  }
});

export default router;