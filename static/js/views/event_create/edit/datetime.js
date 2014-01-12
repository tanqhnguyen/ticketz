define([
  'underscore'
  , 'marionette'
  , 'views/event_create/datetime_input'
], function(_, Marionette, DatetimeInputView){
  var View = Marionette.ItemView.extend({
    template: '#ec-datetime-template',
    ui: {
      datetimeGroup: '.js-datetime-group'
    },

    events: {

    },

    initialize: function(options) {
      this._timepickers = [];
    },

    onRender: function() {
      var startDateView = this.createDatetimeInputView('start_date', _.t('From'));
      var endDateView = this.createDatetimeInputView('end_date', _.t('To'));

      var $container = $('<div></div>');
      $container.addClass('clearfix');
      $container.append(startDateView.render().$el);
      $container.append(endDateView.render().$el);

      this.ui.datetimeGroup.append($container);
      startDateView.initPicker();
      endDateView.initPicker();
    },

    createDatetimeInputView: function(name, placeholder, index) {
      if (typeof(index) === 'undefined') {
        index = 0;
      }

      var datetimeInputView = new DatetimeInputView({
        className: 'col-sm-3',
        name: name + '_' + index,
        placeholder: placeholder
      });
      this._timepickers.push(datetimeInputView);

      return datetimeInputView;
    }
  });

  return View;
});