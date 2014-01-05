define([
  'underscore'
  , 'marionette'
  , 'views/event_create/tabs'
  , 'views/event_create/information_tab'
], function(_, Marionette, TabsView, InformationTabView){
  return Marionette.Layout.extend({
    template: '#ec-layout-template',
    regions: {
      'tabs': '#tabs'
    },
    onRender: function() {
      this.renderTabs();
    },

    renderTabs: function() {
      var tabs = {};
      tabs[_.t('Information')] = new InformationTabView({
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