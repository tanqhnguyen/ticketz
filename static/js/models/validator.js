define([
  'underscore'
  , 'vendors/validator'
], function(_, Validator){
  var validator = new Validator();

  return {
    length: function(value, options, attribute) {
      try {
        var defaultMsg = '';
        if (typeof(options.min) != 'undefined' && typeof(options.max) != 'undefined') {
          defaultMsg = 'invalid_string_length';
        } else if (typeof(options.min) != 'undefined') {
          defaultMsg = 'invalid_string_length_min';
        } else {
          defaultMsg = 'invalid_string_length_max';
        }

        var msg = options.message || _.t(defaultMsg, {
          min: options.min, 
          max: options.max, 
          attribute: this.getAttributeLabel(attribute)});

        validator.check(value, msg).len(options.min, options.max);
      } catch (e) {
        return e.message;
      }
    },

    regex: function(value, options, attribute) {
      try {
        validator.check(value, options.message).regex(options.pattern);
      } catch (e) {
        return e.message;
      }
    },

    notEmpty: function(value, options, attribute) {
      try {
        validator.check(value, options.message).notEmpty();
      } catch (e) {
        return e.message;
      }
    },

    integer: function(value, options, attribute) {
      var defaultMsg = 'invalid_integer';
      var msg = options.message || _.t(defaultMsg, { 
        attribute: this.getAttributeLabel(attribute)});

      try {
        validator.check(value, msg).isInt();

        if (typeof(options.min) != 'undefined' && typeof(options.max) != 'undefined') {
          defaultMsg = 'invalid_number_length';
        } else if (typeof(options.min) != 'undefined') {
          defaultMsg = 'invalid_number_length_min';
        } else {
          defaultMsg = 'invalid_number_length_max';
        }

        msg = options.message || _.t(defaultMsg, { 
          min: options.min,
          max: options.max,
          attribute: this.getAttributeLabel(attribute)
        });

        if (typeof(options.min) != 'undefined') {
          validator.check(value, msg).min(options.min);
        }

        if (typeof(options.max) != 'undefined') {
          validator.check(value, msg).max(options.max);
        }
      } catch (e) {
        return e.message;
      }
    }
  }
});