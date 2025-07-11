const mongoose = require('mongoose');
const { type } = require('os');
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
});

module.exports = mongoose.model('product', productSchema);