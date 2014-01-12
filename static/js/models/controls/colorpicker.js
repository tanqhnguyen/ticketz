define([
  'marionette'
  , 'vendors/bootstrap3.colorpicker'
], function(Marionette){
  var View = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'input-group',

    template: function(data) {
      return '<input type="text" value="" class="form-control" />';
    },

    onRender: function() {
      var self = this;
      var attribute = Marionette.getOption(self, 'attribute');
      var val = this.model.get(attribute);

      this.$el.css({
        width: 130,
        'margin-top': '3px'
      });

      this.$('input').css({
        width: 122,
        'border-radius': 0,
        margin: '0px 4px',
        padding: '3px'
      }).val(val);

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