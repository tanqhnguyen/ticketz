require([
  'underscore'
  , 'views/event_manage/main'
  , 'collections/events'
], function(_, MainView, Events){
  window.ticketz = window.ticketz || {};

  var events = new Events();

  var view = new MainView({
    el: $('#event-manage'),
    collection: events
  });

  view.render();
});