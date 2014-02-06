define([
  'vendors/underscore'
  , 'vendors/backbone'
  , 'libs/backbone.maze'
  , 'libs/arrg'
], function(_, Backbone, Maze, arrg){
  Backbone.Dispatch = {};
  Backbone.Dispatch = _.extend(Backbone.Dispatch, Backbone.Events);

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

    params.url = '/' + params.url + '/' + method;

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = options.attrs || model.toJSON(options);
    } else {
      params.data = options.data;
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // Make the request, allowing the user to override any Ajax options.
    //var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    var xhr = options.xhr = Backbone.callApi(params.type, params.url, params.data, options);
    model.trigger('request', model, xhr, options);
    return xhr;
  };
  Backbone.Maze = Maze;

  Backbone.extractMethodArgs = arrg;

  Backbone.parseApiError = function(xhr) {
    try {
      var error = JSON.parse(xhr.responseText).error;
      return error;
    } catch (e) {
      return "Network error";
    }
  }

  Backbone.callApi = function(type, uri, data, options) {
    type = type.toLowerCase();
    data = data || {};
    options = options || {};

    if (uri.charAt(0) != '/') {
      uri = '/' + uri;
    }

    uri = apiPrefix + uri;

    var params = _.extend({
      type: type,
      url: uri,
      dataType: 'json'
    }, options);

    if (type == 'post') {
      params['contentType'] = 'application/json';
      params['data'] = JSON.stringify(data);
    } else {
      params['data'] = data;
    }

    var xhr = $.ajax(params);

    if (!options.customError) {
      xhr.error(function(xhr){
        Backbone.Dispatch.trigger('error', Backbone.parseApiError(xhr));
      });      
    }

    xhr.success(function(response){
      if (response.success) {
        Backbone.Dispatch.trigger('success', response.success);
      }

      if (response.redirect) {
        setTimeout(function(){
          window.location.href = response.redirect;
        }, 2000);
      }
    });


    return xhr;
  }

  return Backbone;
});
