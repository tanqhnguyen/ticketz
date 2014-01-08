define([
  'underscore'
  , 'backbone'
  , 'views/common/dialogs/colorpicker'
], function(_, Backbone, ColorpickerDialog){

  var Factory = Backbone.Model.extend({
    mappings: {
      'colorpicker': ColorpickerDialog
    },

    _dialogs: {},

    createDialog: function(options) {
      var id = ['dialog', options.type, options.attribute].join('-')
      options.id = options.id || id;
      var dialog = this._dialogs[options.id];

      if (!dialog) {
        var View = this.mappings[options.type];
        var dialog = new View(options);
        dialog.render();   
        this._dialogs[options.id] = dialog;     
      }
      dialog.triggerMethod('show');

      return dialog;
    }
  });

  return Factory;
});