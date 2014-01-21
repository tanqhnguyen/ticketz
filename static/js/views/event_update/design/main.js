define([
  'underscore'
  , 'marionette'
  , 'views/event_view/main'
  , 'views/event_view/custom_style'
  , 'views/common/dialogs/dialog_factory'
  , 'views/common/fileupload'
], function(_, Marionette, EventView, CustomStyleView, DialogFactory, FileuploadView){
  var View = Marionette.Layout.extend({
    template: '#eu-design-tab-template',

    serializeData: function() {
      return {
        model: this.model
      }
    },

    initialize: function() {
      this.dialogFactory = new DialogFactory({

      });
      this.listenTo(this.model.get('json'), 'change', this.onChangeStyle);
    },

    events: {
      'click .js-trigger-dialog': 'onTriggerDialog',
      'click .js-edit-tooltip': function() {
        return false;
      }
    },

    regions: {

    },

    onRender: function() {
      var self = this;
      this.eventDemoView = new EventView({
        el: this.$('.js-preview'),
        model: this.model
      }).render();

      this.customStyleView = new CustomStyleView({
        model: this.model
      });
      this.customStyleView.render();

      this.customStyleView.on('done', function(){
        var $style = $('#'+self.customStyleView.id);
        if ($style.length > 0) {
          $style.remove();
        }
        $('head').append(self.customStyleView.$el);
      });

      this.eventDemoView.ui.detailContainer
                        .find('.widget-header')
                        .append(this.createEditToolbar('eu-edit-detail-tooltip-template').render().$el);

      this.eventDemoView.ui.locationContainer
                        .find('.widget-header')
                        .append(this.createEditToolbar('eu-edit-location-tooltip-template').render().$el);

      this.eventDemoView.ui.ticketContainer
                        .find('.widget-header')
                        .append(this.createEditToolbar('eu-edit-ticket-tooltip-template').render().$el);

      this.eventDemoView.ui.organizer
                        .find('.widget-header')
                        .append(this.createEditToolbar('eu-edit-organizer-tooltip-template').render().$el);

      this.$('.js-common-style').each(function(){
        self.model.buildControl({
          attribute: $(this).data('attribute'),
          el: $(this),
          type: 'colorpicker'
        });
      });


      this.initEditTooltips();
      this.renderFileUpload();
    },

    renderFileUpload: function() {
      this.fileupload = new FileuploadView({
        el: this.$('.js-fileupload'),
        name: 'banner',
        url: this.model.get('url.uploadBanner'),
        formData: {
          event_id: this.model.id
        },
        buttonTitle: this.model.get('json.banner') ? _.t('Change') : _.t('Upload')
      });

      this.fileupload.render();
    },

    createEditToolbar: function(template) {
      template = '#'+template;
      return new Marionette.ItemView({
        template: template,
        className: 'widget-toolbar'
      });
    },

    initEditTooltips: function() {
      var self = this;
      var $tooltip = this.$('.js-edit-tooltip');

      $tooltip.each(function(){
        var $tooltipContent = $('#'+$(this).data('title'));
        var title = $tooltipContent.html();
        $tooltipContent.remove();

        $(this).bstooltip({
          html: true,
          title: title,
          trigger: $(this).data('trigger') || 'click',
          placement: $(this).data('placement') || 'auto'
        });
      });

    },

    onTriggerDialog: function(e){
      var $target = $(e.currentTarget);
      var dialog = $target.data('dialog');
      var attribute = $target.data('attribute');

      this.dialogFactory.createDialog({
        type: dialog,
        attribute: attribute,
        model: this.model
      });

      return false;
    },

    commonStyle: {
      'commonBodyBgColor': ['detailBodyBgColor', 'locationBodyBgColor', 'ticketBodyBgColor', 'organizerBodyBgColor'],
      'commonBodyColor': ['locationBodyColor', 'ticketBodyColor', 'organizerBodyColor'],
      'commonTitleBgColor': ['detailTitleBgColor', 'locationTitleBgColor', 'ticketTitleBgColor', 'organizerTitleBgColor'],
      'commonTitleColor': ['detailTitleColor', 'locationTitleColor', 'ticketTitleColor', 'organizerTitleColor']
    },

    onChangeStyle: function(model) {
      var changedAttributes = model.changedAttributes();

      _.each(changedAttributes, function(value, key){
        if (this.commonStyle[key]) {
          var related = {};
          _.each(this.commonStyle[key], function(key){
            related[key] = value;
          });

          model.set(related, {silent: true});
        }
      }, this);

      this.customStyleView.render();
    }
  });

  return View;
})