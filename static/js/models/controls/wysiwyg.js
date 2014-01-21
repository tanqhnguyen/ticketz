define([
  'marionette'
  , 'summernote'
], function(Marionette){
  var View = Marionette.ItemView.extend({
    tagName: 'div',

    template: function(data) {

    },

    onRender: function() {
      var self = this;
      var attribute = Marionette.getOption(this, 'attribute');

      this.options.onkeydown = function() {
        self.model.set(attribute, self.$el.code());
      }

      this.options.onblur = function() {
        self.model.set(attribute, self.$el.code());
      }

      this.$el.summernote(this.options);
      this.$el.code(this.model.get(attribute));
    }
  });

  return View;
});