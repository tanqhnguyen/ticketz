define([
  'underscore'
  , 'basemodel'
  , 'collections/ticket_types'
  , 'moment'
], function(_, BaseModel, TicketTypes, moment){
  var Model = BaseModel.extend({
    url: 'event',

    name: 'event',

    computedAttributes: {
      'datetime': ['start_date', 'end_date', function(){
        var startDate = moment(this.get('start_date')).format(Model.MOMENT_DATETIME_FORMAT);
        var endDate = moment(this.get('end_date')).format(Model.MOMENT_DATETIME_FORMAT);
        return _.t('From') + ' ' + startDate + ' ' + _.t('To') + ' ' + endDate;
      }]
    },

    relations: function() {
      return {
        'ticket_types': [TicketTypes]
      }
    },
  }, {
    MOMENT_DATETIME_FORMAT: 'ddd DD.MM.YYYY HH:mm',
    JQUERYUI_DATE_FORMAT: 'D dd.mm.yy',
    JQUERYUI_TIME_FORMAT: 'HH:mm'
  });

  return Model;
})