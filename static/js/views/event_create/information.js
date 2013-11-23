define([
  'underscore'
  , 'marionette'
  , 'views/common/google_map'
], function(_, Marionette, GoogleMapView){
  var View = Marionette.Layout.extend({
    template: '#event-information-template',

    events: {
      'click .js-enter-location': 'onClickEnterLocation',
      'click .js-show-map': 'onClickShowMap',
      'click .js-online-event': 'onClickOnlineEvent'
    },

    regions: {
      location: '.js-event-location'
    },

    ui: {
      locationDetail: '.js-event-location-detail',
      enterLocation: '.js-enter-location',
      showMap: '.js-show-map',
      onlineEvent: '.js-online-event'
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
    },

    // event hanlers
    onClickEnterLocation: function(e) {
      this.location.$el.removeClass('col-sm-10')
                       .addClass('col-sm-4');

      this.ui.locationDetail.show();
      this.ui.enterLocation.hide();
      this.ui.onlineEvent.show();
      this.ui.showMap.show();

      return false;
    },

    onClickShowMap: function(e) {
      this.location.$el.show();
      this.location.$el.removeClass('col-sm-4')
                       .addClass('col-sm-10');

      this.ui.locationDetail.hide();
      this.ui.enterLocation.show();
      this.ui.onlineEvent.show();
      this.ui.showMap.hide();

      return false;
    },

    onClickOnlineEvent: function(e) {
      this.location.$el.hide();

      this.ui.onlineEvent.hide();
      this.ui.locationDetail.hide();
      this.ui.enterLocation.hide();
      this.ui.showMap.show();

      return false;
    }
  });

  return View;
})