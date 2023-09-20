import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: String,
    productPrice: Number,
    size: String,
    quantity: Number,
    productMaterial: String,
    productDescription: String,
    productImage: String
});

const productModel = mongoose.model("Product", ProductSchema);

export default productModel;