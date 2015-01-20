/**
 * Controller containing logic in the add product page.
 */
myApp.controller("addController", function ($scope, $routeParams, Products) {
    $scope.details = {};
    $scope.details.costPrice = 40;
    $scope.details.mrp = 80;
    $scope.details.quantity = 0;

    // Add the details of a product
    $scope.addDetails = function () {

        Products.save($scope.details, function () {
            $scope.success_message = "Product Details Added Successfully";
        });
    };
});