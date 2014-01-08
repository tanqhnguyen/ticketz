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

    initialize: function(options) {
      var self = this;
      this.options.apiKey = this.options.apiKey || window.googleMapKey;

      if (!this.options.apiKey) {
        throw "Must supply google map API key";
      }
    },

    onInitMap: function() {
      this.renderMap();
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
        mapTypeId: google.maps.MapTypeId.ROADMAP,
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

    onPlacesChanged: function(places) {
      if (!_.isArray(places)) {
        places = [places];
      }

      this.markers = this.markers || [];
      for (var i = 0, marker; marker = this.markers[i]; i++) {
        marker.setMap(null);
      }

      // For each place, get the icon, place name, and location.
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0, place; place = places[i]; i++) {
        var image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        var marker = new google.maps.Marker({
          map: this.map,
          icon: image,
          title: place.name,
          position: place.geometry.location
        });

        this.markers.push(marker);

        bounds.extend(place.geometry.location);
      }

      this.map.fitBounds(bounds);
      this.map.setZoom(Marionette.getOption(this, 'zoom'));
    }
  });
})