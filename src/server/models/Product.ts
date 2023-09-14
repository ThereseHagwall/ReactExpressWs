import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: String,
    productName: String,
    productPrice: Number,
    size: String,
});

const productModel = mongoose.model("Product", ProductSchema);

export default productModel;