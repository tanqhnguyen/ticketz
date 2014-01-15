define([
  'underscore'
  , 'backbone'
], function(_, Backbone){
  return Backbone.Maze.Collection.extend({
    model: Backbone.Maze.Model,

    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      return this.sync('list', this, options);
    },

    list: function(options) {
      options = options || {};
      return this.fetch(options);
    },

    parse: function(response) {
      this.pagination = response.pagination;
      return response.data;
    }
  });
})