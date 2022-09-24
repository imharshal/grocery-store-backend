const Customer = require("../model/Customer");

//method to create customer
module.exports.createCustomer = async function (req, res) {
  if (req.method === "POST") {
    try {
      const customer = await Customer.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      });

      res.status(201).json({
        status: true,
        customerId: customer._id,
        message: "Customer created successfully",
      });
    } catch (err) {
      let errors = [];
      for (let i in err.errors) {
        errors.push({
          field: i,
          message: err.errors[i].message,
        });
      }

      res.status(202).json({
        success: false,
        message: "Customer creation failed",
        error: errors,
      });
    }
  }
};

//method to fetch customers list
module.exports.getAllCustomers = async function (req, res) {
  if (req.method === "GET") {
    try {
      const list = await Customer.find({});
      res.status(200).json({ status: true, customers: list });
    } catch (e) {
      res.status(500).json({
        status: false,
        message: "Unable to fetch customer list",
        error: e.message,
      });
    }
  }
};
