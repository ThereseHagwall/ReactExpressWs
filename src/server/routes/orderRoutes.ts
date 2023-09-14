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

export default router;