(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', 'moment', 'bootstrap3.datetimepicker', 'bootstrap.collapse'], factory);
  } else {
    Backbone.Maze = Backbone.Maze || {};
    Backbone.Maze.BootstrapDatetimepickerView = factory(_, Backbone);
  }
}(this, function (_, Backbone) {
  return Backbone.View.extend({
    initialize: function(options) {
      this.options = options || {};
    },

    render: function() {
      this.$el.datetimepicker(this.options);

      return this;
    }
  });
}));