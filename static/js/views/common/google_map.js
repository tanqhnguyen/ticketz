define([
  'underscore'
  , 'backbone'
], function(_, Backbone){
  return Backbone.View.extend({
    mapTemplate: _.template('<div class="google-map"></div>'),
    autocompleteTemplate: _.template('<input id="<%= id %>" type="text" class="google-map-autocomplete <%= className %>" placeholder="<%= placeholder %>" />'),

    defaults: {
      apiInitFunction: 'googleMapInit',
      width: '100%',
      height: '100%',
      latitude: 60.4493248,
      longtitude: 22.259231
    },

    autocompleteDefaults: {
      placeholder: 'Enter location',
      className: '',
      id: 'google-map-autocomplete'
    },

    initialize: function(options) {
      options = options || {};
      var self = this;
      this.apiKey = options.key || window.googleMapKey;

      if (!this.apiKey) {
        throw "Must supply google map API key";
      }

      options = _.defaults(options, this.defaults);
      _.each(options, function(value, key){
        this[key] = value;
      }, this);

      if (options.autocomplete) {
        if (_.isObject(options.autocomplete)) {
          this.autocomplete = _.defaults(options.autocomplete, this.autocompleteDefaults);  
        } else {
          this.autocomplete = this.autocompleteDefaults;
        }
      }

      this.listenTo(this, 'onPlacesChanged', this.onPlacesChanged);

      window[this.apiInitFunction] = window[this.apiInitFunction] || function() {
        self.trigger('map:init');
        self.renderMap();
      }
    },

    render: function() {
      // render template
      this.$el.html(this.mapTemplate());
      this.mapEl = this.$('.google-map')[0];
      if (this.autocomplete) {
        this.$el.append(this.autocompleteTemplate(this.autocomplete));
        this.autocompleteEl = this.$('.google-map-autocomplete')[0];
        this.autocompleteEl.style['display'] = 'none';
      }

      // load the script
      var scriptId = 'google-map-javascript';
      var $script = $('#'+scriptId);
      if ($script.length == 0) {
        $script = $('<script></script>');
        $script.attr('id', scriptId);
        $script.attr('type', 'text/javascript');
        var src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&key='+ this.apiKey +'&sensor=false&callback='+ this.apiInitFunction+'&libraries=places';
        $script.attr('src', src);
        $('head').append($script);
      }
    },

    renderMap: function() {
      this.$el.css({
        'width': this.width,
        'height': this.height
      });

      var mapEl = this.$el[0];
      this.map = new google.maps.Map(mapEl, {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 16,
        center: new google.maps.LatLng(this.latitude, this.longtitude)
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
        self.trigger('onPlacesChanged');
      });

      // Bias the SearchBox results towards places that are within the bounds of the
      // current map's viewport.
      google.maps.event.addListener(self.map, 'bounds_changed', function() {
        self.autocompleteEl.style['display'] = 'inherit';
        var bounds = self.map.getBounds();
        searchBox.setBounds(bounds);
      });
    },

    onPlacesChanged: function() {
      var places = this.searchBox.getPlaces();

      for (var i = 0, marker; marker = this.markers[i]; i++) {
        marker.setMap(null);
      }

      // For each place, get the icon, place name, and location.
      this.markers = [];
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
      this.map.setZoom(16);
    }
  });
})