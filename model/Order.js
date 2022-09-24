const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

orderSchema.virtual("customer", {
  ref: "Customer",
  localField: "customerId",
  foreignField: "_id",
});

module.exports = mongoose.model("Order", orderSchema);
