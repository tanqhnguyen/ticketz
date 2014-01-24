define([
  'marionette'
  , 'models/controls/abstract'
], function(Marionette, AbstractView){
  var View = AbstractView.extend({
    tagName: 'img',

    template: function(data) {

    },

    onRender: function() {
      this._renderValue();
    },

    _renderValue: function() {
      var attribute = Marionette.getOption(this, 'attribute');
      var value = this.model.get(attribute);

      if (!value) {
        this.$el.hide();
      } else {
        this.$el.show();
        this.$el.attr('src', value);
      }
    },

    onChangeModelValue: function() {
      this._renderValue();
    }
  });

  return View;
});