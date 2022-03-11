import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cash: {
    type: Number,
    default: 1000,
  },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
