define([
  'basemodel'
], function(BaseModel){
  var Model = BaseModel.extend({
    urlRoot: 'ticket-type',

    rules: [
      [
        'price amount',
        'integer',
        {
          min: 0
        }
      ],
      [
        'name',
        'length',
        {
          min: 3,
          max: 64
        }
      ]
    ]
  });

  return Model;
})