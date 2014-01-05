define([
  'underscore'
  , 'marionette'
], function(_, Marionette){
  return Marionette.Layout.extend({
    template: function(data) {

    },

    regions: {
      'detail': '.js-event-detail',
      'map': '.js-event-map',
      'address': '.js-event-address',
      'ticketType': '.js-event-ticket-type',
      'organizer': '.js-event-organizer'
    },

    onRender: function() {
      
    }
  });
})