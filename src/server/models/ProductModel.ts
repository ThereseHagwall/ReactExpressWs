import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productMaterial: { type: String },
    productDescription: { type: String }
});

const productModel = mongoose.model("Product", ProductSchema);

export default productModel;