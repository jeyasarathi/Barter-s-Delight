/**
 * List of Custom Services used to operate on the product details
 */
myApp.factory('Products', function($http, localStorageService){
  // Service Object
  var products = {};

  /**
   * Function to read the product details from the backend and store it in local storage
   * @returns {*} - Fetched product details from the backend
   */
  products.query = function(){

    products.details = localStorageService.get('productsInfo');
    if (products.details == null) {
      $http({method: 'GET', url: '/getProducts'}).success(function(response){
         var details = JSON.stringify(response);
         localStorageService.set('productsInfo', details);
         products.details = localStorageService.get('productsInfo');
       });
    }

    return products.details;
  };

  /**
   * Function to add a product to the product list
   * @param productDetail - Object containing the product details to be added
   * @returns {boolean} - Status of the Create operation
   */
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
            // console.log("Product Details Added Successfully");
          });

      products.details.push(new_product);
      localStorageService.set('productsInfo', products.details);

      // console.log(productDetail.productName);
      // console.log(productName);
    }
    return true;
  };

  /**
   * Function to update the details of a product
   * @param productDetail - Object containing the product details to be updated
   * @returns {boolean} - Status of the update operation
   */
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
          // console.log("Product Details Updated Successfully");
    });
    localStorageService.set('productsInfo', products.details);
    products.details = localStorageService.get('productsInfo');
    return true;
  };

  /**
   * Function to remove a product from the product list
   * @param productDetailId - Id of the product to be removed
   * @returns {boolean} - Status of the remove operation
   */
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
            // console.log("Product Deleted Successfully");
          });
      localStorageService.set('productsInfo', products.details);
      return true;
    }
    else {
      // console.log("Remove details failed");
      return false;
    }
    
  };

  /**
   * Function to reset and trigger a new fetch operation in the product details page
   */
  products.resetProductsDetails = function() {
    $http({method: 'GET', url: '/getProducts'}).success(function(response){
      var details = JSON.stringify(response);
      localStorageService.set('productsInfo', details);
      products.details = localStorageService.get('productsInfo');
    });
    // localStorageService.remove('productsInfo');
    // console.log("cleared");
  };

  return products;
});