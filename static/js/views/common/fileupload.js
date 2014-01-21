define([
  'underscore'
  , 'marionette'
  , 'views/mixins/bootstrap_progress'
  , 'vendors/jquery.fileupload'
], function(_, Marionette, bootstrapProgress){
  var View = Marionette.ItemView.extend({
    template: function(data) {
      var template = '<span class="btn btn-success"><i class="icon-file-upload"></i><span class="js-button-title"><%= buttonTitle %></span><input type="file" name="<%= name %>"></span><div class="upload-progress js-upload-progress"></div>'
      return _.template(template, data);
    },

    name: 'file',
    buttonTitle: _.t('Upload'),
    placeholder: '...',

    events: {
      'click .js-upload-area': 'onTriggerUpload',
      'change input[type=file]': 'onChangeFile'
    },

    ui: {
      fileupload: 'input[type=file]',
      fileName: '.js-filename',
      progress: '.js-upload-progress',
      buttonTitle: '.js-button-title'
    },

    serializeData: function() {
      return {
        name: Marionette.getOption(this, 'name'),
        buttonTitle: Marionette.getOption(this, 'buttonTitle')
      }
    },

    initialize: function() {
      this.listenTo(this, 'changeButtonText', this.onChangeButtonText);
    },

    onRender: function() {
      var self = this;
      this.$el.addClass('fileupload');
      this.ui.fileupload.fileupload({
        url: Marionette.getOption(this, 'url'),
        dataType: 'json',
        formData: Marionette.getOption(this, 'formData'),
        done: function (e, data) {
          self.triggerMethod('uploaded', data.result.data);
          self.ui.progress.empty();
        },
        error: function(xhr) {
          Backbone.Dispatch.trigger('error', Backbone.parseApiError(xhr));
          self.ui.progress.empty();
        },
        progressall: function (e, data) {
          var progress = parseInt(data.loaded / data.total * 100, 10);
          self.ui.progress.html(self.generateBootstrapProgress(progress));
        }
      });
    },

    onTriggerUpload: function(e) {
      this.ui.fileupload.trigger('click');
    },

    onChangeFile: function(e) {
      var $target = $(e.currentTarget);
      var fileName = $target.val();
      fileName = fileName.split("\\");
      fileName = _.last(fileName);
      this.ui.fileName.attr('data-title', fileName);
    },

    onChangeButtonText: function(newValue) {
      this.ui.buttonTitle.html(newValue);
    }
  });
  
  View.prototype = _.extend(View.prototype, bootstrapProgress);

  return View;
});