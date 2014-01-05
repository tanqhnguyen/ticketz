define([
  'underscore'
  , 'marionette'
  , 'views/event_create/information/main'
  , 'views/event_create/design/main'
], function(_, Marionette, InformationTabView, DesignTabView){
  return Marionette.Layout.extend({
    template: '#ec-layout-template',
    regions: {
      
    },
    onRender: function() {
      this.renderTabs();
    },

    renderTabs: function() {
      var informationTabView = new InformationTabView({
        el: '#information',
        model: this.model
      });
      informationTabView.render();

      var designTabView = new DesignTabView({
        el: '#design',
        model: this.model
      });
      designTabView.render();
    }
  });
})