define([
  'underscore'
  , 'backbone'
  , 'marionette'
], function(_, Backbone, Marionette){
  var View = Marionette.ItemView.extend({
    onRender: function() {
      var self = this;
      this.$('.js-control').each(function(){
        self.model.buildControl({
          attribute: $(this).data('attribute'),
          el: $(this),
          type: $(this).data('type'),
          inputClass: 'input-sm',
          inputWidth: 80,
          width: 80
        });
      });
    }
  });

  return View;
});