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
    }
  });

  return View;
});