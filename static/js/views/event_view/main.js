define([
  'underscore'
  , 'marionette'
  , 'views/common/google_map'
  , 'views/event_view/custom_style'
  , 'views/event_view/ticket_type_collection'
], function(_, Marionette, GoogleMapView, CustomStyleView, TicketTypeCollectionView){
  return Marionette.ItemView.extend({
    template: '#ev-layout-template',

    regions: {

    },

    ui: {
      title: '.js-title',
      datetime: '.js-datetime',
      description: '.js-description',
      map: '.js-map',
      addressName: '.js-address-name',
      detailContainer: '.js-detail',
      locationContainer: '.js-location',
      address1: '.js-address1',
      address2: '.js-address2',
      city: '.js-city',
      zipcode: '.js-zipcode',
      ticket: '.js-ticket',
      ticketContainer: '.js-ticket-container',
      organizer: '.js-organizer',
      organizerName: '.js-organizer-name',
      organizerContact: '.js-organizer-contact',
      banner: '.js-banner'
    },

    initialize: function() {
      this.listenTo(this.model.get('json'), 'change:map', this.onPlacesChanged);
    },

    serializeData: function() {
      return {
        event: this.model
      };
    },

    htmlControls: function() {
      return {
        'title': this.ui.title,
        'description': this.ui.description,
        'address_name': this.ui.addressName,
        'address1': this.ui.address1,
        'address2': this.ui.address2,
        'city': this.ui.city,
        'zipcode': this.ui.zipcode,
        'datetime': this.ui.datetime,
        'organizer_contact': this.ui.organizerContact,
        'organizer_name': this.ui.organizerName
      };
    },

    onRender: function() {
      var self = this;

      _.each(this.htmlControls(), function(el, attribute){
        this.model.buildControl({
          attribute: attribute,
          el: el,
          type: 'html'
        });
      }, this);

      this.renderBanner();


      var mapOptions = {
        height: '300px',
        autoComplete: false
      }

      var map = self.model.get('json.map');
      if (map) {
        var location = self.model.get('json.map').toJSON();
        mapOptions['latitude'] = location.lat;
        mapOptions['longitude'] = location.lng;
        mapOptions['markerTitle'] = this.model.get('json.address_name');
        mapOptions['showMarker'] = true;
      }

      this.map = new GoogleMapView(mapOptions);

      this.map.render();
      this.ui.map.html(this.map.$el);
      this.map.initMap();



      this.style = new CustomStyleView({
        model: this.model
      });

      this.style.on('done', function(){
        var $style = $('#'+self.style.id);
        if ($style.length == 0) {
          $('head').append(self.style.$el);
        }
      });

      this.style.render();

      this.ticketType = new TicketTypeCollectionView({
        collection: this.model.get('ticket_types'),
        el: this.ui.ticket,
      });
      this.ticketType.render();
    },

    onPlacesChanged: function() {
      this.map.triggerMethod('placesChanged', this.model.get('json.map'));
    },

    renderBanner: function() {
      if (this.model.get('json.banner')) {
        this.ui.banner.html(this.model.buildControl({
          attribute: 'json.banner.full',
          type: 'image'
        }).$el);        
      }
    }
  });
})