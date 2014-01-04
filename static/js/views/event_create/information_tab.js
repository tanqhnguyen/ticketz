define([
  'underscore'
  , 'marionette'
  , 'views/event_create/location'
  , 'views/event_create/datetime'
  , 'views/event_create/description'
  , 'views/event_create/ticket'
], function(_, Marionette, LocationView, DatetimeView, DescriptionView){
  var View = Marionette.Layout.extend({
    template: '#event-information-tab-template',

    events: {

    },

    regions: {
      'location': '.js-location',
      'datetime': '.js-datetime',
      'description': '.js-description',
      'ticket': '.js-ticket'
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
    },
  });

  return View;
})