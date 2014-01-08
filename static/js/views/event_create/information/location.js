define([
  'underscore'
  , 'marionette'
  , 'views/common/google_map'
  , 'views/event_create/information/address'
], function(_, Marionette, GoogleMapView, AddressView){
  var View = Marionette.Layout.extend({
    template: '#ec-location-layout-template',

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

    onRender: function() {
      this.renderAddress();
      this.renderMap();
    },

    renderMap: function() {
      var self = this;
      if (this.map.currentView) {
        return;
      }
      
      this.map.show(new GoogleMapView({
        height: '300px',
        autoCompletePlaceholder: _.t('Enter location'),
        autoCompleteClassName: 'form-control',
        autoCompleteId: 'event-location'
      }));
      this.map.currentView.initMap();
      this.listenTo(this.map.currentView, 'placesChanged', this.onPlacesChanged);
    },

    onPlacesChanged: function(places) {
      var place = _.first(places);

      if (place) {
        this.model.set('map', place, {raw: true});
      }
    },

    renderAddress: function() {
      this.address.show(new AddressView({
        model: this.model
      }));
    }
  });

  return View;
});