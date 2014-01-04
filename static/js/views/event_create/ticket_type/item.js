define([
  'underscore'
  , 'marionette'
], function(_, Marionette){
  var View = Marionette.ItemView.extend({
    template: '#event-ticket-type-detail-template',

    serializeData: function() {
      return {
        ticketType: this.model
      }
    }
  });

  return View;
});