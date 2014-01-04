define([
  'underscore'
  , 'marionette'
], function(_, Marionette){
  var View = Marionette.ItemView.extend({
    template: '#event-ticket-type-detail-template',
    tagName: 'tr',

    events: {
      'click .js-remove-ticket-type': 'onClickRemoveTicketType'
    },

    serializeData: function() {
      return {
        ticketType: this.model
      }
    },

    ui: {
      price: '.js-ticket-type-price',
      amount: '.js-ticket-type-amount'
    },

    initialize: function() {
      
    },

    onRender: function() {
      this.model.bindView('price', this.ui.price);
      this.model.bindView('amount', this.ui.amount);
    },

    onClickRemoveTicketType: function() {
      this.model.collection.remove(this.model);
    }
  });

  return View;
});