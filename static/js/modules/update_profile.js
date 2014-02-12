require([
  'underscore'
  , 'views/update_profile/main'
  , 'models/user'
], function(_, MainView, User){
  window.ticketz = window.ticketz || {};
  var user = new User(window.ticketz.user);

  var view = new MainView({
    el: $('#update-profile'),
    model: user
  });

  view.render();
});