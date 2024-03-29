import mongoose from "mongoose";

const landSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: false,
    default: "L&R.Ltd",
  },
  price: {
    type: String,
    required: false,
    default: "N/A",
  },
  isForSale: {
    type: Boolean,
    default: false,
  },
  game: {
    type: String,
    required: false,
    default: "N/A",
  },
});

const LandModel = mongoose.model("Land", landSchema);

export default LandModel;
