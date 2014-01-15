require([
  'underscore'
  , 'views/event_list/main'
], function(_, MainView){
  window.ticketz = window.ticketz || {};

  var view = new MainView({
    el: $('#event-list')
  });

  view.render();
});