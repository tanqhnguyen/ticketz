define([
  'basemodel'
  , 'collections/ticket_types'
], function(BaseModel, TicketTypes){
  var Model = BaseModel.extend({
    urlRoot: 'event',

    relations: function() {
      return {
        'ticketTypes': [TicketTypes]
      }
    },
  });

  return Model;
})