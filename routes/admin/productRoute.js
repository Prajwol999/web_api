const express = require("express");
const router = express.Router();
const productController = require("../../controllers/admin/productManagement");

router.post("/add", productController.createProduct);
router.get("/", productController.getProducts);


module.exports = router;