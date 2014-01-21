define([
  'marionette'
  , 'models/controls/abstract'
], function(Marionette, AbstractView){
  var View = AbstractView.extend({
    template: function(data) {

    },

    onRender: function() {
      this._renderValue();
    },

    _renderValue: function() {
      var attribute = Marionette.getOption(this, 'attribute');
      this.$el.html(this.model.get(attribute));
    },

    onChangeModelValue: function() {
      this._renderValue();
    }
  });

  return View;
});