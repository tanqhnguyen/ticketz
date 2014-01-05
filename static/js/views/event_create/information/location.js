define([
  'underscore'
  , 'marionette'
  , 'views/common/google_map'
  , 'views/event_create/information/address'
], function(_, Marionette, GoogleMapView, AddressView){
  var View = Marionette.Layout.extend({
    template: '#ec-location-layout-template',

    regions: {
      map: '.js-event-map',
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
    },

    renderMap: function() {
      if (this.map.currentView) {
        return;
      }
      
      this.map.show(new GoogleMapView({
        model: this.model,
        height: '300px',
        autocomplete: {
          placeholder: _.t('Enter location'),
          className: 'form-control',
          id: 'event-location'
        }
      }));
    },

    renderAddress: function() {
      this.address.show(new AddressView({
        model: this.model
      }));
    },

    // event hanlers
    onClickHideMap: function(e) {
      this.address.currentView.ui.hideMap.hide();
      this.address.currentView.ui.showMap.show();
      this.address.currentView.ui.onlineEvent.show();
      this.address.currentView.ui.offlineEvent.hide();

      this.address.$el.removeClass('col-sm-4')
                      .addClass('col-sm-8');

      if (this.map && this.map.$el) {
        this.map.$el.hide();  
      }
      

      return false;
    },

    onClickShowMap: function(e) {
      this.address.currentView.ui.hideMap.show();
      this.address.currentView.ui.showMap.hide();
      this.address.currentView.ui.onlineEvent.show();
      this.address.currentView.ui.offlineEvent.hide();

      this.address.$el.removeClass('col-sm-8')
                      .addClass('col-sm-4');

      this.renderMap();
      if (this.map && this.map.$el) {
        this.map.$el.show();  
      }

      return false;
    },

    onClickOnlineEvent: function(e) {
      this.onClickHideMap();
      this.address.currentView.ui.hideMap.hide();
      this.address.currentView.ui.showMap.hide();
      this.address.currentView.ui.onlineEvent.hide();
      this.address.currentView.ui.offlineEvent.show();

      this.address.currentView.$('input').attr('disabled', 'disabled');

      if (this.map && this.map.$el) {
        this.map.$el.hide();  
      }

      return false;
    },

    onClickOfflineEvent: function(e) {
      this.address.currentView.ui.hideMap.hide();
      this.address.currentView.ui.showMap.show();
      this.address.currentView.ui.onlineEvent.show();
      this.address.currentView.ui.offlineEvent.hide();

      this.address.currentView.$('input').removeAttr('disabled');
      if (this.map && this.map.$el) {
        this.map.$el.hide();  
      }

      return false;
    }
  });

  return View;
});