require([
  'underscore'
  , 'views/event_create/app'
  , 'views/event_create/layout'
  , 'views/event_create/tabs'
  , 'views/event_create/information'
  , 'models/event'
], function(_, app, LayoutView, TabsView, InformationView, Event){
  window.ticketz = window.ticketz || {};
  window.ticketz.app = app;

  var event = new Event();

  app.addInitializer(function(){
    app.layout = new LayoutView({
      el: $('#event-create')
    });
    app.layout.render();
    // if (event.isNew()) {
    //   event.save().done(function(response){
    //     renderTabs();
    //   });
    // } else {
    //   renderTabs();
    // }

    renderTabs();
  });

  function renderTabs() {
    var tabs = {};
    tabs[_.t('Information')] = new InformationView({
      model: event
    });
    tabs[_.t('Design')] = 'Design content';

    var tabsView = new TabsView({
      tabs: tabs,
      toggle: 'pills'
    });

    window.ticketz.app.layout.tabs.show(tabsView);
  };

  app.start();
});