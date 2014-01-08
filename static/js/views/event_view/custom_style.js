define([
  'underscore'
  , 'backbone'
  , 'marionette'
  , 'vendors/less'
], function(_, Backbone, Marionette, less){

  var View = Marionette.ItemView.extend({
    events: {

    },

    tagName: 'style',
    id: 'event-custom-style',

    template: '#ev-custom-style-template',

    serializeData: function() {
      return {
        model: this.model
      }
    },

    onRender: function() {
      this.parse();
      return this;
    },

    parse: function() {
      var self = this;
      var parser = new less.Parser();
      var style = this.$el.html();

      parser.parse(style, function (err, tree) {
        if (err) {
          self.triggerMethod('done', err);
        } else {
          self.$el.html(tree.toCSS({ compress: false }));
          self.triggerMethod('done');
        }
      });
    }
  });

  return View;
});