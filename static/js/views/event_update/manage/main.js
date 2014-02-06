define([
  'underscore'
  , 'marionette'
  , 'collections/tickets'
  , 'views/common/grid'
  , 'views/event_update/manage/ticket_grid_item'
], function(_, Marionette, Tickets, GridView, TicketGridItemView){
  var View = Marionette.ItemView.extend({
    template: '#eu-manage-tab-template',

    serializeData: function() {
      return {
        model: this.model
      }
    },

    ui: {
      ticketList: '.js-ticket-list'
    },

    initialize: function() {
      this.tickets = new Tickets();
    },

    onRender: function() {
      this.loadTickets()
    },

    loadTickets: function() {
      var self = this;
      var data = {
        event_id: this.model.id
      }

      this.tickets.list({
        data: data
      }).success(function(){
        var gridView = new GridView({
          headers: [_.t('Code'), _.t('Event'), _.t('Date'), _.t('User'), '&nbsp;'],
          itemView: TicketGridItemView,
          collection: self.tickets,
          pageRange: 9,
          data: data,
          className: 'table table-hover'
        });
        gridView.render();

        self.ui.ticketList.html(gridView.$el);
      });
    }
  });

  return View;
})