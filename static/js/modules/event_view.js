require([
  'underscore'
  , 'views/event_view/main'
  , 'models/event'
], function(_, MainView, Event){
  window.ticketz = window.ticketz || {};

  var event = new Event(ticketz.event);

  var view = new MainView({
    el: $('#event-view'),
    model: event    
  });
  view.setupNotyAlertListeners();

  view.render();
});