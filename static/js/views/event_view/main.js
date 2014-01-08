define([
  'underscore'
  , 'marionette'
  , 'views/common/google_map'
  , 'views/event_view/custom_style'
], function(_, Marionette, GoogleMapView, CustomStyleView){
  return Marionette.ItemView.extend({
    template: '#ev-layout-template',

    regions: {

    },

    ui: {
      title: '.js-event-title',
      description: '.js-event-description',
      map: '.js-event-map',
      detailContainer: '.js-event-detail'
    },

    initialize: function() {
      this.listenTo(this.model, 'change:map', this.onPlacesChanged);
    },

    serializeData: function() {
      return {
        event: this.model
      };
    },

    onRender: function() {
      var self = this;
      this.model.buildControl({
        attribute: 'title',
        el: this.ui.title,
        type: 'html'
      });

      this.model.buildControl({
        attribute: 'description',
        el: this.ui.description,
        type: 'html'
      });

      this.map = new GoogleMapView({
        height: '300px',
        autoComplete: false
      });
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
    },

    onPlacesChanged: function() {
      this.map.triggerMethod('placesChanged', this.model.get('map'));
    }
  });
})