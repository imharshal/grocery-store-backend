const mongoose = require("mongoose");

const productDetailsSchema = new mongoose.Schema(
  {
    productCategory: {
      type: String,
      unique: true,
      required: [true, "Product Category is required"],
      min: [3, "Invalid name, mininum 3 letters required"],
    },
    productInfo: {
      type: String,
      required: [true, "Product Information is required"],
      lowercase: true,
    },
    price: {
      type: Number,
      default: 0,
      min: [0, "Price cannot be negative"],
    },
    quantityAvailable: {
      type: Number,
      default: 0,
    },
  },
  { toJSON: { versionKey: false }, id: false }
);

module.exports = mongoose.model("Product", productDetailsSchema);
