define([
  'underscore'
  , 'backbone'
  , 'basecollection'
  , 'models/event'
], function(_, Backbone, BaseCollection, Model){
  return BaseCollection.extend({
    model: Model
  });
})