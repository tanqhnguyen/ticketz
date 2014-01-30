define([
  'underscore'
  , 'backbone'
  , 'marionette'
], function(_, Backbone, Marionette){
  var View = Marionette.ItemView.extend({
    template: '#tv-upcoming-event-item-template',
    tagName: 'div',

    serializeData: function(){
      return {
        model: this.model
      };
    },

    onRender: function() {
      
    }
  });

  return View;
});