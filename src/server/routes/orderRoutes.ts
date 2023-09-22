import express, { Request, Response, Router } from "express";
import Order from "../models/OrderModel";
import orderModel from "../models/OrderModel";
var router = express.Router();


//SKAPA NY ORDER
router.post('/add', async (req: Request, res: Response) => {
  try {
    const { productName, productPrice, size, quantity, customerName } = req.body;

    const newOrder = new Order({
      products: [{
        productName,
        productPrice,
        size,
        quantity,
      }],
      quantity,
      customerName, // Use the customerName from the request body
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


router.put("/orders/:id/products/:productId", async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const productId = req.params.productId;
    const updateData = req.body;

    const updateResult: any = await orderModel.updateOne(
      { _id: orderId, "products._id": productId },
      { $set: { "products.$": updateData } }
    );
    
    if (updateResult.nModified === 0) {
      return res.status(404).json({ error: 'Order or product not found or no changes made' });
    }

    res.status(200).json({ message: 'Product within order updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating product within order' });
  }
});




export default router;