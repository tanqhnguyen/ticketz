define([
  'underscore'
  , 'marionette'
], function(_, Marionette){
  var View = Marionette.ItemView.extend({
    template: '#ev-ticket-type-detail-template',
    tagName: 'tr',

    events: {
      
    },

    serializeData: function() {
      return {
        ticketType: this.model
      }
    },

    ui: {
      price: '.js-price',
      amount: '.js-amount',
      name: '.js-name',
      amountLeft: '.js-amount-left'
    },

    initialize: function() {
      
    },

    htmlControls: function() {
      return {
        'price': this.ui.price,
        'name': this.ui.name,
        'amount': this.ui.amount,
        'amount_left': this.ui.amountLeft
      };
    },

    onRender: function() {
      _.each(this.htmlControls(), function(el, attribute){
        this.model.buildControl({
          attribute: attribute,
          el: el,
          type: 'html'
        });
      }, this);
    }
  });

  return View;
});