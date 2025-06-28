const ProductListModel = require('../models/product')



const getAllProducts = async (req, res) => {
    try {
        const products = await ProductListModel.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST new product
const createProduct = async (req, res) => {
    try {
        const newProduct = new ProductListModel(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getAllProducts,
    createProduct
};