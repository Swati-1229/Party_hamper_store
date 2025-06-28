const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// router.get('/', async (req, res) => {
//     const products = await Product.find();
//     res.json(products);
// });

// router.post('/', async (req, res) => {
//     const newProduct = new Product(req.body);
//     await newProduct.save();
//     res.status(201).json(newProduct);
// });

const { getAllProducts, createProduct } = require('../controller/ProductController');
router.get('/', getAllProducts);
router.post('/post', createProduct);

module.exports = router;