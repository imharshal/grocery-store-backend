const Product = require("../model/Product");

//method to create new Product
module.exports.createProduct = async function (req, res) {
  if (req.method === "POST") {
    try {
      const product = await Product.create({
        productCategory: req.body.productCategory,
        productInfo: req.body.productInfo,
        price: req.body.price,
        quantityAvailable: req.body.quantityAvailable,
      });

      res.status(201).json({
        status: true,
        productId: product._id,
        message: "Product Created Successfully",
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
        message: "Product creation failed",
        error: errors,
      });
    }
  }
};

//method to create update Product price by id
module.exports.updateProductPrice = async function (req, res) {
  try {
    if (req.method === "PUT") {
      let productId = null;
      let price = null;
      let errorMessage = null;
      //Checking if product id is given by any way
      if (req.params.id) productId = req.params.id;
      else if (req.body.productId) {
        productId = req.body.productId;
      } else {
        errorMessage = "Product ID is required";
      }
      //Checking if price parameter is given
      if (!req.body.price) {
        errorMessage = "Price is required";
      } else {
        price = req.body.price;
      }
      //if correct productId and price is given price will be updated
      if (productId && price) {
        let updatedPrice = { price };
        Product.findByIdAndUpdate(
          productId,
          updatedPrice,
          function (err, updatedProduct) {
            if (err) {
              res.json({
                success: false,
                message: "Invalid product ID",
              });
            } else {
              res.json({
                status: true,
                message: "Product price updated successfully",
              });
            }
          }
        );
      } else {
        res.status(400).json({
          success: false,
          message: errorMessage,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unknown error occured",
    });
  }
};

//method to fetch product list
module.exports.getAllProducts = async function (req, res) {
  if (req.method === "GET") {
    try {
      const list = await Product.find({});
      res.status(200).json({ status: true, products: list });
    } catch (e) {
      res.status(500).json({
        status: false,
        message: "Unable to fetch product list",
        error: e.message,
      });
    }
  }
};
