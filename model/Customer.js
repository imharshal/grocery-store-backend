const mongoose = require("mongoose");

const customerDetailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      min: [3, "Invalid name, mininum 3 letters required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required"],
      min: [1000000000, "Invalid phone number"],
      max: [9999999999, "Invalid phone number"],
    },
  },
  { toJSON: { versionKey: false } }
);

customerDetailsSchema.path("email").validate((email) => {
  if (
    email.includes("@") &&
    email.includes(".") &&
    email.lastIndexOf(".") <= email.length - 3 &&
    email.indexOf("@") !== 0
  )
    return true;
  return false;
}, "Invalid email format");
module.exports = mongoose.model("Customer", customerDetailsSchema);
