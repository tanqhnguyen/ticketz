define([
  'underscore'
  , 'backbone'
  , 'marionette'
], function(_, Backbone, Marionette){
  return Marionette.View.extend({
    autocompleteTemplate: _.template('<input id="<%= id %>" type="text" class="<%= cid %>-google-map-autocomplete <%= className %>" placeholder="<%= placeholder %>" />'),

    apiInitFunction: 'googleMapInit',
    width: '100%',
    height: '100%',
    latitude: 60.4493248,
    longitude: 22.259231,
    zoom: 16,

    autoCompletePlaceholder: 'Enter location',
    autoCompleteClassName: '',
    autoCompleteId: 'google-map-autocomplete',
    autoComplete: true,

    showMarker: false,
    markerTitle: 'TicketZ',

    initialize: function(options) {
      var self = this;
      this.options.apiKey = this.options.apiKey || window.googleMapKey;

      if (!this.options.apiKey) {
        throw "Must supply google map API key";
      }

      this.once('initMap', function(){
        this.renderMap();
        var showMarker = Marionette.getOption(this, 'showMarker');
        if (showMarker) {
          var lat = Marionette.getOption(this, 'latitude');
          var lng = Marionette.getOption(this, 'longitude');
          var markerTitle = Marionette.getOption(this, 'markerTitle');
          this.renderMarker(lat, lng, markerTitle);
        }
      }, this);
    },

    initMap: function() {
      var self = this;
      // load the script
      var scriptId = 'google-map-javascript';
      var $script = $('#'+scriptId);
      if ($script.length == 0) {
        var apiInitFunction = Marionette.getOption(this, 'apiInitFunction');
        var apiKey = Marionette.getOption(this, 'apiKey');
        window[apiInitFunction] = window[apiInitFunction] || function() {
          self.triggerMethod('initMap');
        } 

        var $script = $('<script></script>');
        $script.attr('id', scriptId);
        $script.attr('type', 'text/javascript');
        var src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&key='+ apiKey +'&sensor=false&callback='+apiInitFunction+'&libraries=places';
        $script.attr('src', src);
        $('head').append($script);
      } else {
        this.triggerMethod('initMap');
      }
    },

    _autoCompleteOptions: function() {
      return {
        id: Marionette.getOption(this, 'autoCompleteId'),
        placeholder: Marionette.getOption(this, 'autoCompletePlaceholder'),
        className: Marionette.getOption(this, 'autoCompleteClassName'),
        cid: this.cid
      };
    },

    render: function() {
      var self = this;
      // render template
      var autoComplete = Marionette.getOption(this, 'autoComplete');

      if (autoComplete) {
        this.$el.append(this.autocompleteTemplate(this._autoCompleteOptions()));
        this.autocompleteEl = this.$('.'+this.cid+'-google-map-autocomplete')[0];
        this.autocompleteEl.style['display'] = 'none';
      }

      this.$el.css({
        'width': Marionette.getOption(this, 'width'),
        'height': Marionette.getOption(this, 'height')
      });
    },

    renderMap: function() {
      var latitude = Marionette.getOption(this, 'latitude');
      var longitude = Marionette.getOption(this, 'longitude');

      this.map = new google.maps.Map(this.$el[0], {
        zoom: Marionette.getOption(this, 'zoom'),
        center: new google.maps.LatLng(latitude, longitude)
      });

      this.renderAutocomplete();
    },

    renderAutocomplete: function() {
      var self = this;

      if (!this.autocompleteEl) {
        return;
      }

      // Create the search box and link it to the UI element.
      var input = this.autocompleteEl;
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      self.markers = [];
      self.searchBox = new google.maps.places.SearchBox(input)
      var searchBox = self.searchBox;

      // Listen for the event fired when the user selects an item from the
      // pick list. Retrieve the matching places for that item.
      google.maps.event.addListener(searchBox, 'places_changed', function(){
        self.triggerMethod('placesChanged', searchBox.getPlaces());
      });

      // Bias the SearchBox results towards places that are within the bounds of the
      // current map's viewport.
      google.maps.event.addListener(self.map, 'bounds_changed', function() {
        self.autocompleteEl.style['display'] = 'inherit';
        var bounds = self.map.getBounds();
        searchBox.setBounds(bounds);
      });
    },

    renderMarker: function(lat, lng, title) {
      var latLng = new google.maps.LatLng(lat,lng);
      var title = title || Marionette.getOption(this, 'markerTitle');

      this.marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: title
      });

      return this.marker
    },

    onPlacesChanged: function(places) {
      if (!_.isArray(places)) {
        places = [places];
      }

      if (this.marker) {
        this.marker.setMap(null);
      }

      var place = _.first(places);

      for (var i = 0, marker; marker = this.markers[i]; i++) {
        marker.setMap(null);
      }

      var bounds = new google.maps.LatLngBounds();
      bounds.extend(place.geometry.location);
      this.renderMarker(place.geometry.location.d, place.geometry.location.e);
      this.map.fitBounds(bounds);
      this.map.setZoom(Marionette.getOption(this, 'zoom'));
    }
  });
})