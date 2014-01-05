// TODO: turn this one into a model control
define([
  'underscore'
  , 'marionette'
  , 'backbone.maze.bootstrap.datetimepicker'
], function(_, Marionette, BootstrapDatetimepickerView){
  return Marionette.ItemView.extend({
    template: '#datetime-input-template',

    initialize: function(options) {
      this.options = options || {};
    },

    serializeData: function() {
      return this.options;
    },

    onRender: function() {
      
    },

    initPicker: function() {
      this.datetimepicker = new BootstrapDatetimepickerView({
        el: this.$el
      });
      this.datetimepicker.render();
    }
  });
});