define([
  'marionette'
  , 'vendors/bootstrap3.colorpicker'
], function(Marionette){
  var View = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'input-group',

    inline: false,

    template: function(data) {
      return '<input type="text" value="" class="form-control" />';
    },

    width: 130,
    inputWidth: 122,

    onRender: function() {
      var self = this;
      var attribute = Marionette.getOption(self, 'attribute');
      var val = this.model.get(attribute);

      this.$el.css({
        width: Marionette.getOption(self, 'width'),
        'margin-top': '3px'
      });

      this.$('input').css({
        width: Marionette.getOption(self, 'inputWidth'),
        'border-radius': 0,
        margin: '0px 4px',
        padding: '3px'
      }).val(val);

      this.$('input').addClass(Marionette.getOption(self, 'inputClass'));

      var options = {
        inline: Marionette.getOption(self, 'inline')
      };

      if (options.inline) {
        options.container = this.$el;
      }

      this.$('input').colorpicker(options);

      this.$('input').colorpicker().on('changeColor', function(e){
        clearTimeout(self.$el.data('changeColor'));
        self.$el.data('changeColor', setTimeout(function() {
          self.model.set(attribute, e.color.toHex());
        }, 200));
      });
    }
  });

  return View;
});