define([
  'backbone'
  , 'vendors/jquery.noty'
  , 'vendors/jquery.noty.top'
  , 'vendors/jquery.noty.bootstrap'
], function(Backbone){
  return {
    hideNotyAlert: function() {
      $.noty.closeAll();
    },

    _alertTypeMappings: {
      'error': 'error',
      'warn': 'warning',
      'info': 'information',
      'success': 'success'
    },

    showNotyAlert: function(type, message) {
      var self = this;

      var _noty = function(content) {
        if (_.isArray(content)) {
          content = content.join('<br/>');
        } else if (_.isObject(content)) {
          var values = _.values(content);
          content = _.flatten(values).join('<br/>');
        }
        
        var options = {
          text: _.t(content),
          type: self._alertTypeMappings[type],
          timeout: 2000,
          layout: 'top'
        };
        noty(options);
      };

      if (message) {
        return _noty(message);
      }

      return _noty;
    },

    setupNotyAlertListeners: function() {
      this.listenTo(Backbone.Dispatch, 'error', this.showNotyAlert('error'));
      this.listenTo(Backbone.Dispatch, 'warn', this.showNotyAlert('warn'));
      this.listenTo(Backbone.Dispatch, 'info', this.showNotyAlert('info'));
      this.listenTo(Backbone.Dispatch, 'success', this.showNotyAlert('success'));
    }
  }
});