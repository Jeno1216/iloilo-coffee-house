const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ich_users'
    }, 
    title: String,
    description: String,
    file: String,
})

const ProductModel = mongoose.model('product', ProductSchema)

module.exports = ProductModel;

// 'product' is the table name