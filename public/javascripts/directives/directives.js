/**
 * List of custom directives used in the products details page
 */

/**
 * Directive to display the header of the application using custom directives (element)
 */
myApp.directive('myHeader', function () {
    return {
        restrict: 'AE',
        templateUrl: 'templates/header.html'
    }
});

/**
 * Directive to display the footer of the application using custom directives (element)
 */
myApp.directive('myFooter', function () {
    return {
        restrict: 'AE',
        templateUrl: 'templates/footer.html'
    }
});

/**
 * Directive to display the header of the edit/add products page using custom directives (attribute)
 */
myApp.directive('myEditHead', function () {
    return {
        restrict: 'AE',
        template: '<div class="table-head"><h1>Edit Product Details</h1><span data-ng-bind="success_message"></span></div>'
    }
});

/**
 * Directive to display the header of the edit/add products page using custom directives (attribute)
 */
myApp.directive('myAddHead', function () {
    return {
        restrict: 'AE',
        template: '<div class="table-head"><h1>Add Product</h1><span data-ng-bind="success_message"></span></div>'
    }
});