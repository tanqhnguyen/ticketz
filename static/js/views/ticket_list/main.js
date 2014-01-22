define([
  'underscore'
  , 'backbone'
  , 'marionette'
  , 'collections/tickets'
  , 'views/common/grid'
  , 'views/ticket_list/ticket_grid_item'
], function(_, Backbone, Marionette, Tickets, GridView, TicketGridItemView){
  var View = Marionette.Layout.extend({
    template: '#tv-layout-template',

    regions: {
      ticket: '.js-ticket-list'
    },

    initialize: function(options) {
      this.tickets = new Tickets();
    },

    onRender: function() {
      var self = this;
      this.loadTickets();
    },

    loadTickets: function() {
      var self = this;
      var data = {
        
      }

      this.tickets.list({
        data: data
      }).success(function(){
        var gridView = new GridView({
          headers: [_.t('Code'), _.t('Event'), '&nbsp;'],
          itemView: TicketGridItemView,
          collection: self.tickets,
          pageRange: 9,
          data: data,
          className: 'table table-hover'
        });

        self.ticket.show(gridView);
      });
    }
  });

  return View;
});