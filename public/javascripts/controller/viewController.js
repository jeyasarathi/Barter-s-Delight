/**
 * Created by 460473 on 12/3/2014.
 */
myApp.controller("viewController", function ($scope, $routeParams, Products) {
    $scope.details = {};
    Products.get({id: $routeParams.id}, function (data) {
        $scope.details = data;
    });
});