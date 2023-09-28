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
      updatedTotalPrice, } = req.body;

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
      updatedTotalPrice,
      isSent: false,
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
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
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

router.put("/orders/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const { isSent } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { isSent }, 
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Cannot find the order to update" });
    }
    console.log(updatedOrder)
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


router.put("/orders/:id/products/:productId", async (req, res) => {
  try {
    const orderId = req.params.id;
    const productId = req.params.productId;
    const updateData = req.body;

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    const productToUpdateIndex = order.products.findIndex(product => {
      return product._id && product._id.toString() === productId;
    });

    if (productToUpdateIndex === -1) {
      return res.status(404).json({ error: 'Product not found within the order' });
    }

    order.products[productToUpdateIndex].productName = updateData.productName;
    await order.save();
    const productSize = await ProductSize.findOne({ productId });

    res.status(200).json({ message: 'Product within order updated successfully', productSize });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating product within order' });
  }
});

router.delete("/orders/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await orderModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Cannot find the order to delete' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;