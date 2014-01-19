define([
  'underscore'
  , 'backbone'
  , 'models/validator'
  , 'models/controls/input'
  , 'models/controls/wysiwyg'
  , 'models/controls/html'
  , 'models/controls/colorpicker'
  , 'models/controls/font_family'
  , 'models/controls/datetime'
], function(_, Backbone, Validator, InputControlView, WysiwygControlView
  , HtmlControlView, ColorpickerControlView
  , FontFamilyControlView, DatetimeControlView){
  return Backbone.Maze.Model.extend({
    controls: {
      'input': InputControlView,
      'wysiwyg': WysiwygControlView,
      'html': HtmlControlView,
      'colorpicker': ColorpickerControlView,
      'font_family': FontFamilyControlView,
      'datetime': DatetimeControlView
    },

    computedAttributes: {
      
    },

    formattedAttributes: {
    },

    constructor: function() {
      Backbone.Maze.Model.apply(this, Array.prototype.slice.apply(arguments));
      this._setupComputedAttributes();
    },

    _setupComputedAttributes: function() {
      var computedAttributes = _.result(this, 'computedAttributes');
      _.each(computedAttributes, function(dependencies, attribute){
        var compute = _.last(dependencies);
        if (!_.isFunction(compute)) {
          // we have a missing computed function here
          // use a default one instead
          compute = function() {
            throw "Missing compute function";
          }
        }
        dependencies = dependencies.slice(0, dependencies.length-1);

        _.each(dependencies, function(dep){
          this.on('change:'+dep, function(){
            this.set(attribute, compute.apply(this));
          }, this);
        }, this);

        this.set(attribute, compute.apply(this));
      }, this);
    },

    rules: [],

    attributeLabels: {

    },

    result: function(name) {
      if (this[name]) {
        return this[name];
      }
      return this.get(name);
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

    buildControl: function(options) {
      options.model = this;

      var control = new this.controls[options.type](options);
      control.render();
      return control;
    },
  });
})