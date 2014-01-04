require([
  'underscore'
  , 'views/event_create/main'
  , 'models/event'
], function(_, MainView, Event){
  window.ticketz = window.ticketz || {};

  var event = new Event();

  var view = new MainView({
    el: $('#event-create'),
    model: event    
  });

  view.render();
});