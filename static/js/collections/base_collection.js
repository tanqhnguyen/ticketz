define([
  'underscore'
  , 'backbone'
], function(_, Backbone){
  return Backbone.Maze.Collection.extend({
    model: Backbone.Maze.Model
  });
})