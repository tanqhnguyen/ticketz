define([
  'underscore'
  , 'marionette'
], function(_, Marionette){
  return Backbone.Marionette.Layout.extend({
    template: '#layout-template',
    regions: {
      'tabs': '#tabs'
    },
    onRender: function() {
      
    }
  });
})