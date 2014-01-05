define([
  'marionette'
  , 'vendors/jquery.typing'
], function(Marionette){
  var View = Marionette.ItemView.extend({
    tagName: 'input',

    template: function(data) {

    },

    onRender: function() {
      this.$el.attr('type', 'text');

      var self = this;

      var attribute = Marionette.getOption(this, 'attribute');
      this.$el.val(this.model.get(attribute));

      this.$el.typing({
        start: function(e, el) {
          var $target = $(e.currentTarget);
        },
        stop: function(e, el) {
          var $target = $(e.currentTarget);
          var val = $target.val();
          if (!self.model.set(attribute, val, {validate: true})) {
            $target.tooltip({
              title: self.model.validationError[attribute][0],
              trigger: 'manual',
              placement: 'auto left'
            });
            $target.tooltip('show');
          } else {
            $target.tooltip('hide');
            $target.tooltip('destroy');
          }
        }
      });
    }
  });

  return View;
});