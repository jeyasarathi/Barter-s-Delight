myApp.directive('editHead', function() {
  return {
    restrict: 'AE',
    template:'<div class="table-head"><h1>Product Details</h1><span data-ng-bind="success_message"></span</div>'
  }

});