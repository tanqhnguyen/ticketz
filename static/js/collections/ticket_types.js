define([
  'underscore'
  , 'backbone'
  , 'basecollection'
  , 'models/ticket_type'
], function(_, Backbone, BaseCollection, Model){
  return Backbone.Maze.Collection.extend({
    model: Model
  });
})