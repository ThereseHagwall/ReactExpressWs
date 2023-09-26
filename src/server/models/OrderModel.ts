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
  orderDate: { type: Date, default: Date.now },
  name: { type: String, required: true },
  mail: { type: String, required: true },
  mobile: { type: String, required: true },
  adress: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  shipping: { type: String, required: true },
  swishNumber: { type: Number },
  bankDetails: { type: String},
  cartItems: {type: Array},
  totalPrice: { type: Number, required: true },
});

const orderModel = mongoose.model("Order", OrderSchema);

export default orderModel;