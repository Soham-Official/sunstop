const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sellername: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  imageurl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Products", productSchema);
