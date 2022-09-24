const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  productList: {
    type: [String],
  },
  totalPrice: {
    type: Number,
  },
  paymentInfo: {
    type: {
      type: String,
    },
  },
});

orderSchema.virtual("customer", {
  ref: "Customer",
  localField: "customerId",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model("Order", orderSchema);
