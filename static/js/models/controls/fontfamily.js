define([
  'marionette'
  , 'vendors/bootstrap3.colorpicker'
], function(Marionette){
  var View = Marionette.ItemView.extend({
    tagName: 'div',

    template: function(data) {

    },

    events: {
      'change select': 'onChange'
    },

    fonts: [
      'Georgia, serif',
      '"Palatino Linotype", "Book Antiqua", Palatino, serif',
      '"Times New Roman", Times, serif',
      'Arial, Helvetica, sans-serif',
      '"Arial Black", Gadget, sans-serif',
      '"Comic Sans MS", cursive, sans-serif',
      'Impact, Charcoal, sans-serif',
      '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
      'Tahoma, Geneva, sans-serif',
      '"Trebuchet MS", Helvetica, sans-serif',
      'Verdana, Geneva, sans-serif',
      '"Courier New", Courier, monospace',
      '"Lucida Console", Monaco, monospace'
    ],

    onRender: function() {
      var $select = $('<select></select>');
      _.each(this.fonts, function(font){
        var $option = $('<option></option>');

        $option.val(font);
        $option.text(font);

        $select.append($option);
      });

      this.$el.html($select);
    },

    onChange: function() {
      var attribute = Marionette.getOption(this, 'attribute');
      console.log(this.$('option:selected').val(), attribute);
      this.model.set(attribute, this.$('option:selected').val());
    }
  });

  return View;
});