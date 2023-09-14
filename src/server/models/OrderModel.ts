import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: String,
  productName: String,
  productPrice: Number,
  size: String,
  quantity: Number,
});

const OrderSchema = new Schema({
  products: [ProductSchema],
  quantity: { type: Number, required: true },
  customerName: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("Order", OrderSchema);

export default orderModel;