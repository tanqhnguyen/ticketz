define([
  'underscore'
  , 'backbone'
  , 'models/validator'
  , 'vendors/jquery.typing'
], function(_, Backbone, Validator){
  return Backbone.Maze.Model.extend({
    rules: [],

    attributeLabels: {

    },

    getAttributeLabel: function(attr) {
      return this.attributeLabels[attr] || "NOT FOUND";
    },

    isValid: function() {
      return _.size(this.validationError) == 0;
    },

    validate: function(attributes, options) {
      attributes = attributes || this.attributes;
      var self = this;
      var errors = {};
      _.each(self.rules, function(rule){
        var attrs = rule[0].split(',');
        var validatorName = rule[1];
        var validatorOptions = rule[2];
        validatorOptions = validatorOptions || {};
        _.each(attrs, function(_attr){
          _attr = _.trim(_attr);
          _attr = _attr.split(' ');
          _.each(_attr, function(attr){
            if (typeof(attributes[attr]) != 'undefined') {
              if (self.get('scenario') && validatorOptions['on']) {
                if (_.indexOf(validatorOptions['on'], self.get('scenario')) == -1) {
                  return;
                }
              }

              if (_.isFunction(validatorOptions.message)) {
                validatorOptions.message = validatorOptions.message.apply(self, [attr]);
              }

              var result = null;
              if (Validator[validatorName]) {
                result = Validator[validatorName].apply(self, [attributes[attr], validatorOptions, attr]);  
              } else {
                result = self[validatorName].apply(self, [attributes[attr], validatorOptions, attr]);
              }
              
              if (result) {
                errors[attr] = errors[attr] || [];
                errors[attr].push(result);
              }
            }
          });
        });
      });

      if (_.size(errors) == 0) {
        return undefined;
      }
      return errors;
    },

    bindView: function(attribute, $el) {
      if ($el.is('input')) {
        this._bindinput(attribute, $el);  
      }
    },

    _bindinput: function(attribute, $el) {
      var self = this;

      $el.val(self.get(attribute));

      $el.typing({
        start: function(e, el) {
          var $target = $(e.currentTarget);
        },
        stop: function(e, el) {
          var $target = $(e.currentTarget);
          var val = $target.val();
          if (!self.set(attribute, val, {validate: true})) {
            $target.tooltip({
              title: self.validationError[attribute][0],
              trigger: 'manual'
            });
            $target.tooltip('show');
          } else {
            $target.tooltip('hide');
            $target.tooltip('destroy');
          }
        }
      });
    }
  });
})