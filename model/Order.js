const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    productList: {
      type: [{ type: String, ref: "Product" }],
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
  {
    timestamps: true,
    toJSON: { virtuals: true, versionKey: false },
    id: false,
  }
);

orderSchema.virtual("customer", {
  ref: "Customer",
  localField: "customerId",
  foreignField: "_id",
});

module.exports = mongoose.model("Order", orderSchema);
