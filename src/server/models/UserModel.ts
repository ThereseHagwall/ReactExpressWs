import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: String,
  password: String,
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;