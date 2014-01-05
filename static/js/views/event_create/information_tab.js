define([
  'underscore'
  , 'marionette'
  , 'views/event_create/location'
  , 'views/event_create/datetime'
  , 'views/event_create/description'
  , 'views/event_create/ticket_type'
  , 'views/event_create/organizer'
], function(_, Marionette, LocationView, DatetimeView, DescriptionView, TicketView, OrganizerView){
  var View = Marionette.Layout.extend({
    template: '#event-information-tab-template',

    events: {

    },

    regions: {
      'location': '.js-location',
      'datetime': '.js-datetime',
      'description': '.js-description',
      'ticket': '.js-ticket-type',
      'organizer': '.js-organizer'
    },

    onRender: function() {
      this.location.show(new LocationView({
        model: this.model
      }));

      this.datetime.show(new DatetimeView({
        model: this.model
      }));

      this.description.show(new DescriptionView({
        model: this.model
      }));

      this.ticket.show(new TicketView({
        model: this.model
      }));

      this.organizer.show(new OrganizerView({
        model: this.model
      }));
    },
  });

  return View;
})