define([
  'underscore'
  , 'marionette'
], function(_, Marionette){
  var View = Marionette.ItemView.extend({
    template: '#event-address-template',
    className: 'form-group',
    ui: {
      hideMap: '.js-hide-map',
      showMap: '.js-show-map',
      onlineEvent: '.js-online-event',
      offlineEvent: '.js-offline-event'
    }
  });

  return View;
})