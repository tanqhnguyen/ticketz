define([
  'underscore'
  , 'backbone'
  , 'marionette'
  , 'collections/tickets'
  , 'collections/events'
  , 'views/common/grid'
  , 'views/common/empty'
  , 'views/ticket_list/ticket_grid_item'
  , 'views/ticket_list/upcoming_event_item'
], function(_, Backbone, Marionette, Tickets, Events, GridView, EmptyView, TicketGridItemView, UpcomingEventItemView){
  var View = Marionette.Layout.extend({
    template: '#tv-layout-template',

    regions: {
      ticket: '.js-ticket-list',
      upcomingEvent: '#upcoming-event'
    },

    initialize: function(options) {
      this.tickets = new Tickets();
      this.upcomingEvents = new Events();
    },

    onRender: function() {
      var self = this;
      this.loadUpcomingEvents();
      this.loadTickets();
    },

    loadUpcomingEvents: function() {
      var self = this;
      var data = {
        filter: {
          upcoming: true
        }
      };

      this.upcomingEvents.list({
        data: data
      }).success(function(){
        var gridView = new Marionette.CollectionView({
          itemView: UpcomingEventItemView,
          collection: self.upcomingEvents,
          emptyView: EmptyView
        });

        self.upcomingEvent.show(gridView);
      });
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