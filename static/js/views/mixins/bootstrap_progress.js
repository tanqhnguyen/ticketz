define([
  'underscore'
  , 'backbone'
], function(_, Backbone){
  return {
    _bootstrapProgress: '<div class="progress"><div class="progress-bar progress-bar-<%= type %>" role="progressbar" aria-valuenow="<%= percentage %>" aria-valuemin="0" aria-valuemax="100" style="width: <%= percentage %>%"><span class="sr-only"><%= percentage %>%</span></div></div>',

    generateBootstrapProgress: function() {
      var args = Backbone.extractMethodArgs(arguments, ['percentage', 'type'], {type: 'success'});
      
      return _.template(this._bootstrapProgress, args);
    }
  }
})