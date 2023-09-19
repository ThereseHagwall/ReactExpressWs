import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SizeSchema = new Schema({
  sizeName: String
});

const Size = mongoose.model('Size', SizeSchema);

export default Size;
