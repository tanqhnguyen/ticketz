define([
  'underscore'
  , 'marionette'
  , 'views/event_update/design/tooltip_content'
  , 'views/event_view/main'
  , 'views/event_view/custom_style'
  , 'views/common/dialogs/dialog_factory'
  , 'views/common/fileupload'
  , 'vendors/jquery.qtip2'
], function(_, Marionette, TooltipContentView, EventView, CustomStyleView, DialogFactory, FileuploadView){
  var View = Marionette.Layout.extend({
    template: '#eu-design-tab-template',

    serializeData: function() {
      return {
        model: this.model
      }
    },

    editIcon: _.template('<div class="widget-toolbar"><a href="#" class="js-edit" data-my="<%= my %>" data-at="<%= at %>" data-content="<%= content %>"><i class="fa fa-pencil-square-o"></i></a></div>'),

    initialize: function() {
      this.dialogFactory = new DialogFactory({

      });
      this.listenTo(this.model.get('json'), 'change', this.onChangeStyle);
    },

    events: {
      'click .js-trigger-dialog': 'onTriggerDialog',
      'click .js-edit-tooltip': function() {
        return false;
      },
      'click .js-edit': function() {
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

      this.$('.js-common-style').each(function(){
        self.model.buildControl({
          attribute: $(this).data('attribute'),
          el: $(this),
          type: 'colorpicker'
        });
      });

      this.createEditIcons();
      this.initEditTooltips();
      this.renderFileUpload();
    },

    // createEditPanel: function(id) {
    //   id = '#eu-'+id+'-template';
    //   return new Marionette.ItemView({
    //     template: id
    //   });
    // },

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

    createEditIcons: function() {
      this.eventDemoView.ui.detailContainer
                        .find('.widget-header')
                        .append(this.editIcon({
                          content: 'eu-edit-detail-template',
                          my: 'top right',
                          at: 'bottom left'
                        }));

      this.eventDemoView.ui.locationContainer
                        .find('.widget-header')
                        .append(this.editIcon({
                          content: 'eu-edit-location-template',
                          my: 'top right',
                          at: 'bottom left'
                        }));

      this.eventDemoView.ui.ticketContainer
                        .find('.widget-header')
                        .append(this.editIcon({
                          content: 'eu-edit-ticket-template',
                          my: 'bottom right',
                          at: 'top left'
                        }));

      this.eventDemoView.ui.organizer
                        .find('.widget-header')
                        .append(this.editIcon({
                          content: 'eu-edit-organizer-template',
                          my: 'bottom right',
                          at: 'top left'
                        }));
    },

    initEditTooltips: function() {
      var self = this;
      this.$('.js-edit').each(function(){
        var $el = $(this);
        $el.qtip({
          content: {
            text: function(e, api) {
              var view = new TooltipContentView({
                template: '#'+$el.data('content'),
                model: self.model
              });
              return view.render().$el;
            }
          },
          style: {
            classes: 'qtip-flat qtip-bootstrap qtip-shadow'
          },
          position: {
            my: $el.data('my'),
            at: $el.data('at'),
            of: $el,
            viewport: true,
            adjust: {
              method: 'shift'
            }
          },
          show: 'click',
          hide: 'click',
          events: {
            render: function(e) {
              $(e.currentTarget).find('.js-common-style').each(function(){
                self.model.buildControl({
                  attribute: $(this).data('attribute'),
                  el: $(this),
                  type: 'colorpicker',
                  width: 100,
                  inputWidth: 80
                });                
              });
            }
          }
        })
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