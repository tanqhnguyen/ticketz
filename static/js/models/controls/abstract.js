define([
  'marionette'
], function(Marionette){
  var View = Marionette.ItemView.extend({
    initialize: function() {
      var self = this;
      var attribute = Marionette.getOption(this, 'attribute');
      this.listenTo(this.model, 'change:'+attribute, function(){
        self.triggerMethod('changeModelValue');
      });

      this.listenTo(this.model, 'validationFailed', function(errors){
        if (errors[attribute]) {
          self.triggerMethod('modelError', errors[attribute]);
        }
      });
    },

    getModelValue: function() {
      var attribute = Marionette.getOption(this, 'attribute');
      return this.model.result(attribute);
    }
  });

  return View;
});