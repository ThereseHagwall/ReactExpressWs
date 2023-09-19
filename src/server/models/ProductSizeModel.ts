import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSizeSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  sizeName: String,
  quantity: Number
});


const ProductSize = mongoose.model('ProductSize', ProductSizeSchema);

export default ProductSize;