define([
  'underscore'
  , 'marionette'
  , 'views/event_update/edit/ticket_type/collection'
], function(_, Marionette, TicketTypeCollectionView){
  var View = Marionette.ItemView.extend({
    template: '#eu-ticket-type-template',

    ui: {
      ticketTypeList: '.js-ticket-type-list'
    },

    events: {
      'click .js-add-ticket-type': 'onClickAddTicketType'
    },

    initialize: function(options) {
      var ticketTypes = this.model.get('ticket_types');
    },

    onRender: function() {
      this.collectionView = new TicketTypeCollectionView({
        collection: this.model.get('ticket_types'),
        el: this.ui.ticketTypeList
      });

      this.collectionView.render();
    },

    onClickAddTicketType: function() {
      var ticketTypes = this.model.get('ticket_types');
        ticketTypes.add({
          name: 'Free for all',
          price: 0,
          description: 'Ticket description',
          amount: 100
        }, {validate: true});
    }
  });

  return View;
});