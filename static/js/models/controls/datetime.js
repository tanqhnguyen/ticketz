define([
  'marionette'
  , 'models/controls/abstract'
  , 'moment'
  , 'bootstrap3.datetimepicker'
], function(Marionette, AbstractView, moment){
  var View = AbstractView.extend({
    template: function(data) {
      return '<input type="text" class="form-control" /><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>';
    },

    defaultDate: '',
    format: 'LL',
    placeholder: null,

    onRender: function() {
      this.$el.addClass('input-group');
      var placeholder = Marionette.getOption(this, 'placeholder');
      if (placeholder) {
        this.$('input').attr('placeholder', placeholder);
      }      
      this.initDatetimePicker();
    },

    onChangeModelValue: function() {
      
    },

    initDatetimePicker: function() {
      var attribute = Marionette.getOption(this, 'attribute');
      var format = Marionette.getOption(this, 'format');

      var self = this;

      this.$el.datetimepicker({
        defaultDate: this.model.get(attribute) || Marionette.getOption(this, 'defaultDate') || moment(),
        format: moment.langData().longDateFormat(format)
      });

      this.$el.on('change.dp', function(e){
        // weird shit with input-group
        if (e.date) {
          self.model.set(attribute, e.date.format(format));
        }
      });
    }
  });

  return View;
});