import express, { Request, Response, Router } from "express";
import Order from "../models/OrderModel";
import orderModel from "../models/OrderModel";
import ProductSize from "../models/ProductSizeModel";
var router = express.Router();
import mongoose from 'mongoose'


//SKAPA NY ORDER
router.post('/add', async (req: Request, res: Response) => {
  try {
    const {
      name,
      mail,
      mobile,
      adress,
      paymentMethod,
      shipping,
      swishNumber,
      bankDetails,
      cartItems,
      totalPrice, } = req.body;

      const newOrder = new Order({
        orderDate: new Date(),
        cartItems,
      name,
      mail,
      mobile,
      adress,
      paymentMethod,
      shipping,
      swishNumber,
      bankDetails,
      totalPrice,
    });

    const createOrder = await newOrder.save();
    console.log('createOrder', createOrder);
    res.json(createOrder);
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


//Hämta alla ordrar
router.get('/orders', async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    //console.log('orders', orders);
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

router.put("/orders/:id/products/:productId", async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const productId = req.params.productId;
    const updateData = req.body;

    // Fetch the order by ID
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Convert productId to ObjectId for comparison
    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Find the product within the order based on productId
    const productToUpdate = order.products.find((product) => {
      if (product._id) {
        return (product._id as mongoose.Types.ObjectId).equals(productObjectId);
      }
      return false;
    });

    if (!productToUpdate) {
      return res.status(404).json({ error: 'Product not found within the order' });
    }

    const productSize = await ProductSize.findOne({ productId });

    productToUpdate.productName = updateData.productName;

    await order.save();

    res.status(200).json({ message: 'Product within order updated successfully', productSize });
  } catch (error) {
    res.status(500).json({ error: 'Error updating product within order' });
  }
});

export default router;