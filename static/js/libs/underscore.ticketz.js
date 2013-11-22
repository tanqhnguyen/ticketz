define([
  'vendors/underscore/underscore'
], function(_){
  _.mixin({
    t: function(text) {
      return text;
    }
  });
  
  return _;
});