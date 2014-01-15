require([
  'underscore'
  , 'views/event_list/main'
  , 'collections/events'
], function(_, MainView, Events){
  window.ticketz = window.ticketz || {};

  var events = new Events();

  var view = new MainView({
    el: $('#event-list'),
    collection: events
  });

  view.render();
});