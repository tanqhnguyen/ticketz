define([
  'basemodel'
], function(BaseModel){
  var Model = BaseModel.extend({
    urlRoot: 'ticket-type'
  });

  return Model;
})