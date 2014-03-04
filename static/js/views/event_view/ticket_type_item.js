define([
  'underscore'
  , 'marionette'
], function(_, Marionette){
  var View = Marionette.ItemView.extend({
    template: '#ev-ticket-type-detail-template',
    tagName: 'tr',

    events: {
      'click .js-buy': 'onClickBuy'
    },

    serializeData: function() {
      return {
        model: this.model
      }
    },

    ui: {
      price: '.js-price',
      description: '.js-description',
      name: '.js-name'
    },

    initialize: function() {
      
    },

    htmlControls: function() {
      return {
        'price': this.ui.price,
        'name': this.ui.name,
        'description': this.ui.description,
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
    },

    onClickBuy: function(e) {
      var amount = this.$('input[name=amount]').val();
      amount = parseInt(amount);

      if (_.isNaN(amount)) {
        amount = 1;
      }

      var $currentTarget = $(e.currentTarget);
      $currentTarget.bsbutton('loading');

      Backbone.callApi('post', this.model.collection.event.get('url.purchaseTicket'), {
        amount: amount,
        ticket_type_id: this.model.id
      }).success(function(){

      }).complete(function(){
        $currentTarget.bsbutton('reset');
      });
    }
  });

  return View;
});