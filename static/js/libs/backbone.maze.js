(function(){
  var root = this;
  var Maze;
  if (typeof exports !== 'undefined') {
    Maze = exports;
  } else {
    Maze = root.Maze = {};
  }

  // Require Underscore and Backbone, if we're on the server, and it's not already present.
  var _ = root._;
  var Backbone = root.Backbone;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');
  if (!Backbone && (typeof require !== 'undefined')) Backbone = require('backbone');

  var Model = Backbone.Model.extend({
    relations: function() {
      return {};
    },

    _nestedSet: function(attr, value, options) {
      var relations = this.relations();
      var relation = relations[attr];

      if (typeof(relation) == 'undefined') {
        if (_.isArray(value)) {
          if (value.length > 0) {
            if (_.isObject(value[0])) {
              // array of string or integer should be intact
              relation = [Collection];      
            }
          } else if (value.length == 0) {
            // empty array will be turned into collection
            relation = [Collection];      
          }
        } else if (_.isObject(value)) {
          relation = [Model];  
        }
      }

      if (!relation) {
        return value;
      }

      if (value) {
        if (relation[1]) {
          value = relation[1].apply(this, [value]);
        }

        instance = new relation[0](value, options);

        var name = _.result(this, 'name');
        if (name) {
          instance[name] = this;
        }

        return instance;
      }

      return value;
    },

    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];

        if (_.isFunction(val)) {
          continue;
        }

        if (!options.raw) {
          var temp = attr.split('.');

          if (temp.length > 1) {
            // Check if the previous attribute is a model
            var _attr = temp[0];
            var _prev = prev[_attr];

            if (_prev instanceof Model) {
              _prev.set(_.rest(temp).join('.'), val, options);
              unset = true;
            }
          } else if (val instanceof Model || val instanceof Collection) {
            // do something about this?
          } else if (_.isArray(val) 
            || _.isObject(val)) {
            var _prev = prev[attr];

            if (_prev instanceof Model) {
              val = _prev.set(val, options);
            }  else {
              // This is the case when the value is firstly set, and it must not be string, boolean or number
              val = this._nestedSet(attr, val, options);              
            }

          }
        }
        
        // Handle change event
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = true;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    _nestedGet: function(attr) {
      var val = this.attributes[attr];
      var temp = attr.split('.');

      if (temp.length > 1) {
        var relation = this.attributes[temp[0]];

        if (relation instanceof Model) {
          val = relation.get(_.rest(temp).join('.'));
        } else {
          val = relation[temp[1]];
        }          
      }

      return val;
    },

    get: function(attr) {
      var val = this._nestedGet(attr);
      return val;
    },

    toJSON: function(options) {
      var json = _.clone(this.attributes);
      var relations = this.relations();
      _.each(json, function(val, key){
        if (val instanceof Model || val instanceof Collection) {
          json[key] = val.toJSON();
        }
      });

      return json;
    }
  });

  var Collection = Backbone.Collection.extend({
    model: Model
  });

  Maze.Model = Model;
  Maze.Collection = Collection;
}).call(this);