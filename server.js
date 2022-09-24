const express = require("express");
const mongoose = require("mongoose");

const {
  getAllCustomers,
  createCustomer,
} = require("./controller/CustomerController");
const app = express();
const bodyParser = require("body-parser");
const {
  createProduct,
  updateProductPrice,
  getAllProducts,
} = require("./controller/ProductController");
const {
  createOrder,
  getAllOrders,
  getOrderByCustomerId,
} = require("./controller/OrderController");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://localhost/grocery-store",
  () => console.log("connected"),
  (e) => console.log(e)
);

app.post("/customer", createCustomer);
app.get("/customers", getAllCustomers);

app.get("/products", getAllProducts);
app.post("/product", createProduct);
app.put("/product/:id", updateProductPrice);
app.put("/product", updateProductPrice);

app.post("/order", createOrder);
app.get("/orders", getAllOrders);
app.get("/orders/:id", getOrderByCustomerId);
app.listen(5000);
