define([
  'underscore'
  , 'backbone'
  , 'vendors/backbone.marionette'
  , 'views/mixins/noty'
], function(_, Backbone, Marionette, noty){
  var constructor = Marionette.View.prototype.constructor;
  Marionette.View.prototype = _.extend(Marionette.View.prototype, {
    constructor: function() {
      constructor.apply(this, Array.prototype.slice.apply(arguments));
    }
  }, noty);

  return Marionette;
});