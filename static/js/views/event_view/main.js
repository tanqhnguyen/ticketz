define([
  'underscore'
  , 'marionette'
], function(_, Marionette){
  return Marionette.Layout.extend({
    template: '#ev-layout-template',

    regions: {

    },

    ui: {
      title: '.js-event-title',
      description: '.js-event-description'
    },

    serializeData: function() {
      return {
        event: this.model
      };
    },

    onRender: function() {
      this.model.buildControl({
        attribute: 'title',
        el: this.ui.title,
        type: 'html'
      });

      this.model.buildControl({
        attribute: 'description',
        el: this.ui.description,
        type: 'html'
      });
    }
  });
})