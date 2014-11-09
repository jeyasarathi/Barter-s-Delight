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

myApp.filter('camelCaseToSpaceSep', function(){
  
  var camelCaseToSpaceSepFilter = function(input) {
    var words = input.replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function(str){ return str.toUpperCase(); });

    return words;
  };
  return camelCaseToSpaceSepFilter;

});

myApp.filter('range', function() {

  var rangeFilter = function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
  
  return rangeFilter;
});