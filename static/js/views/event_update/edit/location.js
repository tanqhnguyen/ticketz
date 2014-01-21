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