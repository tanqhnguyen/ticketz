require([
  'underscore'
  , 'views/ticket_list/main'
], function(_, MainView){
  window.ticketz = window.ticketz || {};

  var view = new MainView({
    el: $('#ticket-list')
  });

  view.render();
});