define([
  'underscore'
  , 'marionette'
  , 'views/common/google_map'
], function(_, Marionette, GoogleMapView){
  var View = Marionette.Layout.extend({
    template: '#eu-location-layout-template',

    regions: {
      map: '.js-event-pick-map',
      address: '.js-event-address'
    },

    events: {
      'click .js-hide-map': 'onClickHideMap',
      'click .js-show-map': 'onClickShowMap',
      'click .js-online-event': 'onClickOnlineEvent',
      'click .js-offline-event': 'onClickOfflineEvent'
    },

    ui: {
      hideMap: '.js-hide-map',
      showMap: '.js-show-map',
      onlineEvent: '.js-online-event',
      offlineEvent: '.js-offline-event'
    },

    onShow: function() {
      this.renderAddress();
      this.renderMap();
    },

    initialize: function() {
    },

    renderMap: function() {
      var self = this;
      if (this.map.currentView) {
        return;
      }

      var mapOptions = {
        height: '300px',
        autoCompletePlaceholder: _.t('Enter location'),
        autoCompleteClassName: 'form-control',
        autoCompleteId: 'event-location'
      }

      var map = self.model.get('json.map');
      if (map) {
        var location = self.model.get('json.map').toJSON();
        mapOptions['latitude'] = location.lat;
        mapOptions['longitude'] = location.lng;
        mapOptions['markerTitle'] = this.model.get('json.address_name');
        mapOptions['showMarker'] = true;
      }
      
      this.map.show(new GoogleMapView(mapOptions));

      this.map.currentView.initMap();
      this.listenTo(this.map.currentView, 'placesChanged', this.onPlacesChanged);
    },

    onPlacesChanged: function(places) {
      var place = _.first(places);

      if (place) {
        this.model.get('json').set('map', {
          lat: place.geometry.location.d,
          lng: place.geometry.location.e
        });
      }
    },

    renderAddress: function() {
      this.model.buildControl({
        attribute: 'address_name',
        type: 'input',
        el: $('#event-address-name')
      });

      this.model.buildControl({
        attribute: 'address1',
        type: 'input',
        el: $('#event-address1')
      });

      this.model.buildControl({
        attribute: 'address2',
        type: 'input',
        el: $('#event-address2')
      });

      this.model.buildControl({
        attribute: 'city',
        type: 'input',
        el: $('#event-city')
      });

      this.model.buildControl({
        attribute: 'zipcode',
        type: 'input',
        el: $('#event-zipcode')
      });
    }
  });

  return View;
});