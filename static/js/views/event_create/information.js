define([
  'underscore'
  , 'marionette'
  , 'views/common/google_map'
], function(_, Marionette, GoogleMapView){
  var View = Marionette.Layout.extend({
    template: '#event-information-template',

    regions: {
      location: '.js-event-location'
    },

    onRender: function() {
      this.renderLocation();
    },

    renderLocation: function() {
      this.location.show(new GoogleMapView({
        model: this.model,
        height: '400px',
        autocomplete: {
          placeholder: _.t('Enter location'),
          className: 'form-control',
          id: 'event-location'
        }
      }));
    }
  });

  return View;
})