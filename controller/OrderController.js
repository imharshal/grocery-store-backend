const Customer = require("../model/Customer");
const Order = require("../model/Order");
const Product = require("../model/Product");

module.exports.createOrder = async function (req, res) {
  if (req.method === "POST") {
    try {
      const prices = await Product.find({
        _id: { $in: req.body.productList },
      }).select("price -_id");

      const totalPrice = prices.reduce(
        (totalPrice, obj) => totalPrice + obj.price,
        0
      );
      console.log(totalPrice);
      const order = await Order.create({
        customerId: req.body.customerId,
        productList: req.body.productList,
        totalPrice: totalPrice,
        //   paymentInfo: req.body.quantityAvailable,
      });

      res.status(201).json({
        status: true,
        orderId: order._id,
        message: "Order Created Successfully",
      });
    } catch (err) {
      console.log(err);
    }
  }
};

//method to fetch product list
module.exports.getAllOrders = async function (req, res) {
  if (req.method === "GET") {
    try {
      const list = await Order.find({}).populate("productList");
      res.status(200).json({ status: true, orders: list });
    } catch (e) {
      res.status(500).json({
        status: false,
        message: "Unable to fetch product list",
        error: e.message,
      });
    }
  }
};

//method to fetch orders list
module.exports.getOrderByCustomerId = async function (req, res) {
  if (req.method === "GET") {
    try {
      const list = await Order.find({
        customerId: req.params.id,
      }).populate("productList");
      console.log(list.productsOrdered);
      res.status(200).json({ status: true, orders: list });
    } catch (e) {
      res.status(500).json({
        status: false,
        message: "Unable to fetch customer order list",
        error: e.message,
      });
    }
  }
};

//method to fetch customer with maximum order
module.exports.getCustomerWithMaximumOrder = async function (req, res) {
  if (req.method === "GET") {
    try {
      const customers = await Order.aggregate([
        {
          $group: {
            _id: "$customerId",
            totalOrders: { $count: {} },
          },
        },
        { $sort: { totalOrders: -1 } },
      ]);
      const valueCustomers = await Customer.populate(customers, {
        path: "_id",
      });
      res.status(200).json({ status: true, customers: valueCustomers });
    } catch (e) {
      res.status(500).json({
        status: false,
        message: "Unable to fetch customer order list",
        error: e.message,
      });
    }
  }
};
