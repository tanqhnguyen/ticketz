define([
  'marionette'
  , 'summernote'
], function(Marionette){
  var View = Marionette.ItemView.extend({
    tagName: 'div',

    template: function(data) {

    },

    onRender: function() {
      var attribute = Marionette.getOption(this, 'attribute');
      this.$el.summernote(this.options);
      this.$el.code(this.model.get(attribute));
    }
  });

  return View;
});