define([
  'underscore'
  , 'marionette'
  , 'views/event_update/edit/main'
  , 'views/event_update/design/main'
], function(_, Marionette, EditTabView, DesignTabView){
  return Marionette.Layout.extend({
    template: '#eu-layout-template',
    regions: {
      
    },

    events: {
      'click .js-save': 'onSave',
      'click .js-publish': 'onPublish',
      'click .js-unpublish': 'onUnpublish'
    },

    ui: {
      publish: '.js-publish',
      unpublish: '.js-unpublish'
    },

    initialize: function() {
      this.setupNotyAlertListeners();
      this.listenTo(this.model, 'change:is_active', this.onChangeStatus);
    },

    serializeData: function() {
      return {
        model: this.model
      }
    },

    onRender: function() {
      var self = this;
      self.renderTab('edit');

      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var tabName = $(e.target).attr('href');
        tabName = tabName.substr(1, tabName.length);
        self.renderTab(tabName);
      });
    },

    tabs: {
      'edit': EditTabView,
      'design': DesignTabView
    },

    renderTab: function(tabName) {
      if (!this[tabName]) {
        var tabView = new this.tabs[tabName]({
          el: '#'+tabName,
          model: this.model
        });
        tabView.render();
        this[tabName] = tabView;          
      }
    },

    onChangeStatus: function() {
      var isActive = this.model.get('is_active');
      if (isActive) {
        this.ui.publish.addClass('hide');
        this.ui.unpublish.removeClass('hide');
      } else {
        this.ui.publish.removeClass('hide');
        this.ui.unpublish.addClass('hide');
      }
    },

    isValidModels: function() {
      var models = [];
      models.push(this.model);
      models = models.concat(this.model.get('ticket_types').models);

      var failedModelCount = 0;
      for (var i in models) {
        var model = models[i];
        var errors = model.validate();

        // also check previous errors if any
        if (errors || _.size(model.validationError) > 0) {
          errors = errors || model.validationError;
          model.trigger('validationFailed', errors);
          Backbone.Dispatch.trigger('error', errors);
          failedModelCount++;
        }
      }
      return failedModelCount === 0;
    },

    onSave: function(e) {
      var self = this;
      var $currentTarget = $(e.currentTarget);

      $currentTarget.bsbutton('loading');

      if (!this.isValidModels()) {
        $currentTarget.bsbutton('reset');
        return;
      }

      this.model.save().success(function(response){
        self.model.set(response.data);
      }).complete(function(){
        $currentTarget.bsbutton('reset');
      });

      return false;
    },

    onPublish: function(e) {
      var self = this;
      var $target = $(e.currentTarget);
      $target.bsbutton('loading');

      if (!this.isValidModels()) {
        $target.bsbutton('reset');
        return;
      }

      Backbone.callApi('post', this.model.get('url.publish'), {
                event_id: this.model.id
              })
              .success(function(response){
                self.model.set('is_active', response.data.is_active);
              })
              .complete(function(){
                $target.bsbutton('reset');
              });

      return false;
    },

    onUnpublish: function(e) {
      var self = this;
      var $target = $(e.currentTarget);
      $target.bsbutton('loading');

      Backbone.callApi('post', this.model.get('url.unpublish'), {
                event_id: this.model.id
              })
              .success(function(response){
                self.model.set('is_active', response.data.is_active);
              })
              .complete(function(){
                $target.bsbutton('reset');
              });

      return false;
    }
  });
})