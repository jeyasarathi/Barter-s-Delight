/* Angular Application module declaration */
var myApp = angular.module("sampleAngApp", ['ngRoute', 'ngResource']);

/**
 * List of controllers used in the product details page
 */

// Routing different view using Route Provider
myApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'list.html',
                controller: 'listController'
            }).
            when('/view/:id', {
                templateUrl: 'details.html',
                controller: 'viewController'
            }).
            when('/edit/:id', {
                templateUrl: 'edit.html',
                controller: "editController"
            }).
            when('/add', {
                templateUrl: 'add.html',
                controller: 'addController'
            }).
            otherwise({
                templateUrl: 'list.html',
                controller: 'listController'
            });
    }
]);
