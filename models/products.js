/**
 * Created by 460473 on 11/5/2014.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productsSchema = new Schema({
    productId: String,
    productName: String,
    vendor: String,
    type: String,
    costPrice: Number,
    mrp: Number,
    quantity: Number
});

var products = mongoose.model('Products', productsSchema);

products.on('error', function () {
    console.log('\n\nDATABASE ERROR <Mongoose.Model> | <Item>: \n', arguments, '\n\n');
});

module.exports = products;