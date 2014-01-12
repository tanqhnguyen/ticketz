define([
  'underscore'
  , 'basemodel'
  , 'collections/ticket_types'
  , 'moment'
], function(_, BaseModel, TicketTypes, moment){
  var Model = BaseModel.extend({
    urlRoot: 'event',

    computedAttributes: {
      'datetime': ['start_date', 'end_date', function(){
        return _.t('From') + ' ' + this.get('start_date') + ' ' + _.t('To') + ' ' + this.get('end_date');
      }]
    },

    formattedAttributes: {
      'start_date': function(value) {
        return moment(value).format(Model.DATETIME_FORMAT);
      },
      'end_date': function(value) {
        return moment(value).format(Model.DATETIME_FORMAT);
      }
    },

    relations: function() {
      return {
        'ticketTypes': [TicketTypes]
      }
    },
  }, {
    DATETIME_FORMAT: 'LLL'
  });

  return Model;
})