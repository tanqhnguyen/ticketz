define([
  'underscore'
  , 'marionette'
], function(_, Marionette){
  var View = Marionette.ItemView.extend({
    template: '#ec-address-template',
    className: 'form-group',

    onRender: function() {
      
    },

    ui: {
      hideMap: '.js-hide-map',
      showMap: '.js-show-map',
      onlineEvent: '.js-online-event',
      offlineEvent: '.js-offline-event'
    }
  });

  return View;
})