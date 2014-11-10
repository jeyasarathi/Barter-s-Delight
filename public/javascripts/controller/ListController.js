/**
 * List of controllers used in the product details page
 */

// Routing different view using Route Provider
myApp.config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider.
        when('/', {
        templateUrl: 'list.html',
        controller: 'ListController'
      }).
        when('/view/:id', {
        templateUrl: 'details.html',
        controller: 'ListController'
      }).
        when('/edit/:id', {
        templateUrl: 'edit.html',
        controller: 'ListController'
      }).
        when('/add', {
          templateUrl: 'add.html',
          controller: 'AddController'
        }).
        otherwise({
        templateUrl: 'list.html',
        controller: 'ListController'
    });
  }
]);

// Initialize the local storage service provider
myApp.config(['localStorageServiceProvider', 
  function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('demoPrefix');
}
]);

// Initializing the controller and data objects

myApp.controller("ListController", function($scope, $routeParams, localStorageService, Products){

  // List of products object
  $scope.products = Products.query();

  // Section to display the selected product in details page
  var selected_prod_id = $routeParams.id;

  // Get the details of the selected product based on the selected product id from the product list
  $scope.details = {};
  $.each($scope.products, function(index, item) { 
    if (item.productId == selected_prod_id) {
      $scope.details = item;
    }
  });

  // Set the heading of the page using custom filter to change the first letter of each word
  $scope.page_title = "products table";

  // Initialize the sort variables
  $scope.sort = {
    column: '',
    descending: false
  };

  // Change the sort variables for the orderBy filter to sort the table
  $scope.changeSorting = function(column) {

    var sort = $scope.sort;
    if (sort.column == column) {
      sort.descending = !sort.descending;
    } else {
      sort.column = column;
      sort.descending = false;
    }
  };

  // Show and Hide the current sorting order
  $scope.selectedCls = function(column) {
    return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
  };

  // Update the edited details of a product
  $scope.updateDetails = function() {
    var status = Products.updateDetails($scope.details);
    if (status) {
      $scope.success_message = "Product Details Updated Successfully";
    }
  };

  // Remove a product from the table
  $scope.remove = function(index) {
    var status = Products.removeDetails($scope.products[index].productId);
    if (status) {
      console.log("Product removed from the list successfully");
    }
  };

  // Function to reset the product details and trigger a new fetch from the backend
  $scope.resetLocalStorage =  function() {
    Products.resetProductsDetails();
  };

});

/**
 * Controller containing logic in the add product page.
 */
myApp.controller("AddController", function($scope, $routeParams, localStorageService, Products){
  $scope.details.costPrice = 40;
  $scope.details.mrp = 80;
  $scope.details.quantity = 0;

  // Add the details of a product
  $scope.addDetails = function() {
    var status = Products.addDetails($scope.details);
    console.log("status"+ status);
    if (status) {
      $scope.success_message = "Product Details Added Successfully";
    }
  };
});