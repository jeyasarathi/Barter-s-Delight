/**
 * Created by 460473 on 12/3/2014.
 */
myApp.controller("editController", function ($scope, $routeParams, Products) {
    Products.get({id: $routeParams.id}, function (data) {
        $scope.details = data;
    });


    $scope.updateDetails = function () {
        Products.update($scope.details, function () {
            $scope.success_message = "Product Details Updated Successfully";
        });

        Products.get({id: $routeParams.id}, function (data) {
            $scope.details = data;
        });
    };
});