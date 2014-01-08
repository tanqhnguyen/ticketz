define([
  'marionette'
  , 'vendors/bootstrap3.colorpicker'
], function(Marionette){
  var View = Marionette.ItemView.extend({
    tagName: 'div',

    template: function(data) {

    },

    onRender: function() {
      var self = this;
      var attribute = Marionette.getOption(self, 'attribute');
      this.$el.colorpicker({
        container: this.$el,
        inline: true
      });

      this.$el.colorpicker().on('changeColor', function(e){
        self.model.set(attribute, e.color.toHex());
      });
    }
  });

  return View;
});