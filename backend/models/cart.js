const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const cartSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  addedby: {
    type: ObjectId,
    ref: "Users",
  },
  productId: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Cart", cartSchema);
