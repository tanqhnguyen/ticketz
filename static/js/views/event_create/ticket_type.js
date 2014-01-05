define([
  'underscore'
  , 'marionette'
  , 'views/event_create/ticket_type/collection'
], function(_, Marionette, TicketTypeCollectionView){
  var View = Marionette.ItemView.extend({
    template: '#ec-ticket-type-template',

    ui: {
      ticketTypeList: '.js-ticket-type-list'
    },

    events: {
      'click .js-add-ticket-type': 'onClickAddTicketType'
    },

    initialize: function(options) {
      var ticketTypes = this.model.get('ticketTypes');
      if (ticketTypes.size() == 0) {
        ticketTypes.add({
          name: 'Free for all',
          price: 0,
          type: 'free',
          amount: 100
        }, {validate: true});
      }
    },

    onRender: function() {
      this.collectionView = new TicketTypeCollectionView({
        collection: this.model.get('ticketTypes'),
        el: this.ui.ticketTypeList
      });

      this.collectionView.render();
    },

    onClickAddTicketType: function() {
      var ticketTypes = this.model.get('ticketTypes');
        ticketTypes.add({
          name: 'Free for all',
          price: 0,
          type: 'free',
          amount: 100
        }, {validate: true});
    }
  });

  return View;
});