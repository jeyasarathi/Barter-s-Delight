/**
 * List of custom filters used in the product details page
 */

/**
 * Function to change the small case string to Title Case String
 */
myApp.filter('titleCase', function(){
  
  var titleCaseFilter = function(input) {
    var words = input.split(' ');
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
  };
  return titleCaseFilter;

});

/**
 * Function to change camel case string to space separated string
 */
myApp.filter('camelCaseToSpaceSep', function(){
  
  var camelCaseToSpaceSepFilter = function(input) {
    var words = input.replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function(str){ return str.toUpperCase(); });

    return words;
  };
  return camelCaseToSpaceSepFilter;

});

/**
 * Function to return an array to specify the values in the drop down of numbers
 */
myApp.filter('range', function() {

  var rangeFilter = function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
  
  return rangeFilter;
});