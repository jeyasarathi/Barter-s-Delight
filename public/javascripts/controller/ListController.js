// Initializing the controller and data objects

myApp.controller("listController", function ($scope, $routeParams, Products) {

    // Set the heading of the page using custom filter to change the first letter of each word
    $scope.page_title = "products table";

    // Initialize the sort variables
    $scope.sort = {
        column: '',
        descending: false
    };

    // Change the sort variables for the orderBy filter to sort the table
    $scope.changeSorting = function (column) {

        var sort = $scope.sort;
        if (sort.column == column) {
            sort.descending = !sort.descending;
        } else {
            sort.column = column;
            sort.descending = false;
        }
    };

    // Show and Hide the current sorting order
    $scope.selectedCls = function (column) {
        return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
    };

    // List of products object
    var entries = Products.query(function (data) {
        $scope.products = entries;
    });

    // Remove a product from the table
    $scope.remove = function (index) {
        Products.delete({id: $scope.products[index].productId}, function () {
            $scope.success_message = "Product removed from the list successfully";
        });
    };
});