define([
  'underscore'
  , 'marionette'
  , 'views/event_update/edit/location'
  , 'views/event_update/edit/datetime'
  , 'views/event_update/edit/description'
  , 'views/event_update/edit/ticket_type'
  , 'views/event_update/edit/organizer'
], function(_, Marionette, LocationView, DatetimeView, DescriptionView, TicketView, OrganizerView){
  var View = Marionette.Layout.extend({
    template: '#eu-edit-tab-layout-template',

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
      this.model.buildControl({
        attribute: 'title',
        type: 'input',
        el: $('#event-title')
      });

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
    }
  });

  return View;
})