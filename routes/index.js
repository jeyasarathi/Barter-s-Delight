var express = require('express');
var router = express.Router();
var barterController = require('../lib/barterController.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Sample Application' });
});

router.get('/getProducts', barterController.getProducts);
router.post('/updateProductDetails', barterController.updateProductDetails);
router.post('/deleteProduct', barterController.deleteProduct);
router.post('/addProduct', barterController.addProduct);
module.exports = router;
