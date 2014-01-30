define([
  'backbone'
  , 'marionette'
], function(Backbone, Marionette){
  return Marionette.ItemView.extend({
    template: function(){
      return '<h4>No data</h4>'
    }
  });
})