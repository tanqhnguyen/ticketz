define([
  'underscore'
  , 'basemodel'
], function(_, BaseModel){
  var Model = BaseModel.extend({
    url: 'user',

    name: 'user'
  });

  return Model;
})
