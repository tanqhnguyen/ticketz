define([
  'basemodel'
], function(BaseModel){
  var Model = BaseModel.extend({
    url: 'ticket-type'

    // rules: [
    //   [
    //     'price amount',
    //     'integer',
    //     {
    //       min: 0
    //     }
    //   ],
    //   [
    //     'name',
    //     'length',
    //     {
    //       min: 3,
    //       max: 64
    //     }
    //   ],
    //   [
    //     'description',
    //     'length',
    //     {
    //       min: 6,
    //       max: 128
    //     }
    //   ]
    // ]
  });

  return Model;
})