define([
  'vendors/backbone'
  , 'libs/backbone.maze'
], function(Backbone, Maze){
  var methodMap = {
    'create': 'POST',
    'update': 'POST',
    'delete': 'POST',
    'read':   'GET',
    'list': 'GET'
  };

  var apiPrefix = '/api';

  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || model.model.prototype.url;
    }

    if (!params.url) {
      throw "URL is not defined";
    }

    params.url = apiPrefix + '/' + params.url + '/' + method;

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };
  Backbone.Maze = Maze;

  return Backbone;
});