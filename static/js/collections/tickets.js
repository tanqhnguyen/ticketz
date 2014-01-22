define([
  'underscore'
  , 'backbone'
  , 'basecollection'
  , 'models/ticket'
], function(_, Backbone, BaseCollection, Model){
  return BaseCollection.extend({
    model: Model
  });
})