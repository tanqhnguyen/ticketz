define([
  'underscore'
  , 'backbone'
  , 'marionette'
  , 'views/common/dialogs/abstract'
  , 'vendors/bootstrap3.colorpicker'
], function(_, Backbone, Marionette, AbstractView){
  var View = AbstractView.extend({
    className: 'colorpicker-dialog',
    resizable: false,
    title: 'Pick color',

    dialogContent: function() {
      return this.model.buildControl({
        attribute: Marionette.getOption(this, 'attribute'),
        type: 'colorpicker',
        inline: true
      }).$el;
    }
  });

  return View;
});