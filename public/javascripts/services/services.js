myApp.factory('Products', function ($resource) {
    return $resource("/products/:id", {}, {
        get: {method: "GET"},
        update: {method: 'PUT'}
    });
});