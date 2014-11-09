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
    costPrice: Double,
    mrp: Double,
    quantity: Integer
});

module.exports = mongoose.model('Products', productsSchema);