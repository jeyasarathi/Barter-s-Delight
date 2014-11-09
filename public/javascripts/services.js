myApp.factory('Products', function($http, localStorageService){
  var products = {};
  products.query = function(){

    products.details = localStorageService.get('productsInfo');
    if (products.details == null) {
      $http({method: 'GET', url: '/getProducts'}).success(function(response){
         var details = JSON.stringify(response);
         localStorageService.set('productsInfo', details);
         products.details = localStorageService.get('productsInfo');
       });
      products.details = [];
    }

    return products.details;
  };

  products.updateDetails = function(productDetail) {
    var details = {};
    $.each(products.details, function(index, item) { 
      if (item.productId == productDetail.productId) {
        item.productId   = productDetail.productId;
        item.productName = productDetail.productName;
        item.vendor      = productDetail.vendor;
        item.type        = productDetail.type;
        item.costPrice   = productDetail.costPrice;
        item.mrp         = productDetail.mrp;
        item.quantity    = productDetail.quantity;
      }
    });


    $http({method: 'POST', url: '/updateProductDetails', headers: {'Content-Type': 'application/json'}, data: productDetail})
        .success(function(response){
          console.log("Product Details Updated Successfully");
    });
    localStorageService.set('productsInfo', products.details);
    products.details = localStorageService.get('productsInfo');
    return true;
  };

  products.removeDetails = function(productDetailId) {
    var flag = 0;
    for (var i = 0; i < products.details.length; i++) {
      if (products.details[i].productId == productDetailId) {         
        products.details.splice(i, 1);
        flag = 1;
      }
    }

    var delete_prod_id = {id:productDetailId};

    if (flag) {
      $http({method: 'POST', url: '/deleteProduct', headers: {'Content-Type': 'application/json'}, data: delete_prod_id})
          .success(function(response){
            products.details = localStorageService.get('productsInfo');
          });
      localStorageService.set('productsInfo', products.details);
      return true;
    }
    else {
      // console.log("Remove details failed");
      return false;
    }
    
  };
  
  products.resetProductsDetails = function() {
    $http({method: 'GET', url: '/getProducts'}).success(function(response){
      var details = JSON.stringify(response);
      localStorageService.set('productsInfo', details);
      products.details = localStorageService.get('productsInfo');
    });
    // localStorageService.remove('productsInfo');
    // console.log("cleared");
  };

  products.addDetails = function (productDetail) {

    var productName = [];
    var max_id = 0;
    for(var i in products.details) {
      var id = products.details[i].productId;
      productName.push(products.details[i].productName);
      if (id > max_id) {
        max_id = id;
      }
    }

    if ($.inArray(productDetail.productName, productName) == -1) {
      var new_id = max_id + 1;

      var new_product = {};

      new_product.productId = new_id;
      new_product.productName = productDetail.productName;
      new_product.vendor = productDetail.vendor;
      new_product.type = productDetail.type;
      new_product.costPrice = productDetail.costPrice;
      new_product.mrp = productDetail.mrp;
      new_product.quantity = productDetail.quantity;

      $http({method: 'POST', url: '/addProduct', headers: {'Content-Type': 'application/json'}, data: new_product})
          .success(function (response) {
            localStorageService.set('productsInfo', products.details);
          });

      products.details.push(new_product);
      localStorageService.set('productsInfo', products.details);

      console.log(productDetail.productName);
      console.log(productName);
    }
  };
  return products;
});