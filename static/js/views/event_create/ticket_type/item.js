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
      amount: '.js-ticket-type-amount',
      name: '.js-ticket-type-name'
    },

    initialize: function() {
      
    },

    onRender: function() {
      this.model.buildControl({
        attribute: 'price',
        type: 'input',
        el: this.ui.price
      });

      this.ui.amount.html(this.model.buildControl({
        attribute: 'amount',
        type: 'input',
        className: 'form-control'
      }).$el);

      this.ui.name.html(this.model.buildControl({
        attribute: 'name',
        type: 'input',
        className: 'form-control'
      }).$el);
    },

    onClickRemoveTicketType: function() {
      this.model.collection.remove(this.model);
    }
  });

  return View;
});