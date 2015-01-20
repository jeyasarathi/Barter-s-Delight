var express = require('express');
var router = express.Router();
var barterController = require('../lib/barterController.js');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Sample Application'});
});

router.post('/products', barterController.addProduct);
router.get('/products', barterController.getProducts);
router.get('/products/:id', barterController.getProduct);
router.put('/products', barterController.updateProductDetails);
router.delete('/products/:id', barterController.deleteProduct);

module.exports = router;