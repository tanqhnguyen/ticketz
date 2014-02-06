define([
  'marionette'
  , 'models/controls/abstract'
  , 'vendors/jquery.typing'
], function(Marionette, AbstractView){
  var View = AbstractView.extend({
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

          self.model.set(attribute, val, {validate: true});

          if (self.model.validationError && self.model.validationError[attribute]) {
            self.triggerMethod('modelError', self.model.validationError[attribute][0]);  
          } else {
            $target.bstooltip('hide');
            $target.bstooltip('destroy');
          }
        }
      });
    },

    onModelError: function(error) {
      var $target = this.$el;

      $target.bstooltip({
        title: error,
        trigger: 'manual',
        placement: 'auto left',
        template: '<div class="tooltip tooltip-error"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
      });

      $target.bstooltip('show');   
    }
  });

  return View;
});