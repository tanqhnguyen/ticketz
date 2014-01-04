define([
  'underscore'
  , 'marionette'
  , 'views/event_create/ticket_type/collection'
], function(_, Marionette, TicketTypeCollectionView){
  var View = Marionette.ItemView.extend({
    template: '#event-ticket-type-template',
    ticketTemplate: _.template($('#event-ticket-type-detail-template').html()),

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
          amount: -1
        });
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
          amount: -1
        });
    }
  });

  return View;
});