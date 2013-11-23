define([
  'underscore'
  , 'marionette'
  , 'views/event_create/tabs'
  , 'views/event_create/information'
], function(_, Marionette, TabsView, InformationView){
  return Backbone.Marionette.Layout.extend({
    template: '#layout-template',
    regions: {
      'tabs': '#tabs'
    },
    onRender: function() {
      this.renderTabs();
    },

    renderTabs: function() {
      var tabs = {};
      tabs[_.t('Information')] = new InformationView({
        model: this.model
      });
      tabs[_.t('Design')] = 'Design content';

      var tabsView = new TabsView({
        tabs: tabs,
        toggle: 'pills'
      });

      this.tabs.show(tabsView);
    }
  });
})