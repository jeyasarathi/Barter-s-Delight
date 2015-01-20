/**
 * Created by 460473 on 11/3/2014.
 */
var Products = require('../models/products');
var logger = require('../utils/logger');

exports.addProduct = function (req, res) {

    var req_prod_input = req.body;
    var product = new Products({
        productId: req_prod_input.productId
        , productName: req_prod_input.productName
        , vendor: req_prod_input.vendor
        , type: req_prod_input.type
        , costPrice: req_prod_input.costPrice
        , mrp: req_prod_input.mrp
        , quantity: req_prod_input.quantity
    });

    logger.log('info', "Creating Product");

    product.save(function (err) {
        if (!err) {
            logger.log('info', "Product Created");
            res.send("Product Created");
        } else {
            logger.log('error', "Error " + err);
            res.send(err);
        }
    });
};

exports.getProducts = function (req, res) {
    logger.log('info', "Getting products");
    Products.find(function (err, products) {
        if (err) {
            res.send(err);
        }
        res.send(products);
    });
};

exports.getProduct = function (req, res) {

    logger.log('debug', "Getting product detail");
    logger.log('debug', "Id is " + req.params.id);

    Products.findOne({"productId": req.params.id}, function (err, product) {
        if (err) {
            res.send(err);
        }
        logger.log('debug', product);
        res.send(product);
    });

};

// Function to update the product details
exports.updateProductDetails = function (req, res) {
    // Stringify : To convert JSON object to a String to be written in file
    logger.log("Received request data : " + JSON.stringify(req.body));

    var product_id = req.body.productId;

    var update_product = req.body;
    Products.findOne({"productId": product_id}, function (err, product) {
        if (err) {
            res.send(err);
        }

        product.productName = update_product.productName;
        product.vendor = update_product.vendor;
        product.type = update_product.type;
        product.costPrice = update_product.costPrice;
        product.mrp = update_product.mrp;
        product.quantity = update_product.quantity;

        product.save(function (err) {
            if (!err) {
                logger.log('info', "Products Updated " + Date());
                res.send("Products Updated");
            } else {
                res.send(err);
            }
        });

    });
};

exports.deleteProduct = function (req, res) {

    Products.findOne({"productId": req.params.id}, function (err, product) {
        if (err) {
            res.send(err);
        }

        product.remove(function (err) {
            if (!err) {
                res.send("Product removed");
            } else {
                res.send(err);
            }
        });

    });
};