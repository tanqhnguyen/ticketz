define([
  'underscore'
  , 'marionette'
  , 'models/event'
], function(_, Marionette, Event){
  var View = Marionette.ItemView.extend({
    template: '#ec-datetime-template',

    events: {

    },

    ui: {
      startDate: '.js-start-date',
      endDate: '.js-end-date'
    },

    initialize: function(options) {
      
    },

    onShow: function() {
      this.model.buildControl({
        attribute: 'start_date',
        type: 'datetime',
        el: this.ui.startDate,
        format: Event.DATETIME_FORMAT,
        placeholder: _.t('From')
      });

      this.model.buildControl({
        attribute: 'end_date',
        type: 'datetime',
        el: this.ui.endDate,
        format: Event.DATETIME_FORMAT,
        placeholder: _.t('To')
      });
    }
  });

  return View;
});