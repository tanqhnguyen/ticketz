define([
  'underscore'
  , 'marionette'
  , 'views/event_view/main'
], function(_, Marionette, EventView){
  var View = Marionette.Layout.extend({
    template: '#ec-design-tab-template',

    events: {

    },

    regions: {

    },

    onRender: function() {
      this.eventDemoView = new EventView({
        el: this.$el,
        model: this.model
      }).render();
    }
  });

  return View;
})