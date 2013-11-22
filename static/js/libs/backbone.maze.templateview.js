(function (root, factory) {
  if (typeof exports === 'object') {

    var underscore = require('underscore');
    var backbone = require('backbone');

    module.exports = factory(underscore, backbone);

  } else if (typeof define === 'function' && define.amd) {

    define(['underscore', 'backbone'], factory);

  } 
}(this, function (_, Backbone) {
  "option strict";


  Backbone.Maze = Backbone.Maze || {};
  var Backbone.Maze.TemplateView = Backbone.View.extend({
    template: '',

    preInit: function() {
      return true;
    },

    renderMethod: 'html',

    initialize: function(options) {
      options = options || {};
      _.defaults(options, {
        renderMethod: this.renderMethod
      });

      if (!this.preInit(options)) {
        return false;
      }

      if (this.template.jquery) {
        this.template = this.template.html();
      }

      this._compiledTemplate = _.template(this.template);
      this.options = options;
      this.render();

      this.postInit(options);
    },

    postInit: function(options) {

    },

    preRender: function() {
      return true;
    },

    render: function() {
      if (!this.preRender()) {
        return false;
      }
      var template = this._compiledTemplate(this.templateContext());
      this.$el[this.options.renderMethod].apply(this.$el, [template]);

      this.postRender();
      return this;
    },

    postRender: function() {

    },

    templateContext: function() {
      return {
        model: this.model,
        collection: this.collection,
        options: this.options
      };
    }
  });
  

  return Backbone.Maze.TemplateView;
}));