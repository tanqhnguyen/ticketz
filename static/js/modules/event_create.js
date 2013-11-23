require([
  'underscore'
  , 'views/event_create/app'
  , 'views/event_create/layout'
  , 'models/event'
], function(_, app, LayoutView, Event){
  window.ticketz = window.ticketz || {};
  window.ticketz.app = app;

  var event = new Event();

  app.addInitializer(function(){
    app.layout = new LayoutView({
      el: $('#event-create'),
      model: event
    });
    app.layout.render();
    // if (event.isNew()) {
    //   event.save().done(function(response){
    //     renderTabs();
    //   });
    // } else {
    //   renderTabs();
    // }

    //renderTabs();
  });

  app.start();
});