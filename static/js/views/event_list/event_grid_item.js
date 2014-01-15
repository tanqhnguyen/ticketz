define([
  'underscore'
  , 'backbone'
  , 'marionette'
], function(_, Backbone, Marionette){
  var View = Marionette.ItemView.extend({
    template: '#em-event-grid-item-template',
    tagName: 'tr',

    serializeData: function(){
      return {
        event: this.model
      };
    },

    onRender: function() {
      
    }
  });

  return View;
});