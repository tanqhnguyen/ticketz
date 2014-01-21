define([
  'vendors/underscore'
  , 'vendors/underscore.string'
], function(_, _s){
  _.mixin({
    t: function(text) {
      return text;
    }
  });

  _.mixin(_s);
  
  return _;
});