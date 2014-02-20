require([
  'underscore'
  , 'views/event_search/main'
  , 'collections/events'
], function(_, MainView, Events){
  window.ticketz = window.ticketz || {};

  var events = new Events(ticketz.events);

  var view = new MainView({
    el: '#event-search',
    collection: events
  });
  view.setupNotyAlertListeners();

  view.render();
});