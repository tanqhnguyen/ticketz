define([
  'underscore'
  , 'backbone'
  , 'marionette'
], function(_, Backbone, Marionette){
  var View = Marionette.ItemView.extend({
    template: function(data) {

    },

    title: 'Dialog',
    resizable: true,
    width: 'auto',

    initialize: function(options) {
      this.listenTo(this, 'render', this.initEl);
    },

    initEl: function() {
      var self = this;
      var title = Marionette.getOption(this, 'title');
      this.$el.attr('title', title);
      this.$el.html(this.dialogContent());
      $('body').append(this.$el);

      this.$el.dialog({
        width: Marionette.getOption(this, 'width'),
        resizable: Marionette.getOption(this, 'resizable'),
        open: function(event, ui) {
          self.triggerMethod('dialogOpen', event, ui);
        },
        autoOpen: false
      });
    },

    onShow: function() {
      this.$el.dialog('open');
    },

    onHide: function() {
      this.$el.dialog('close');
    }
  });

  return View;
});