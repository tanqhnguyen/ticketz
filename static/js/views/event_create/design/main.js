define([
  'underscore'
  , 'marionette'
  , 'views/event_view/main'
  , 'views/event_view/custom_style'
  , 'views/common/dialogs/dialog_factory'
  , 'text!templates/event_create/design/tooltip_menus/title.html'
  , 'text!templates/event_create/design/tooltip_menus/detail.html'
], function(_, Marionette, EventView, CustomStyleView, DialogFactory, titleEditToolTip, detailEditTooltip){
  var View = Marionette.Layout.extend({
    template: '#ec-design-tab-template',
    editTemplate: _.template('<i style="position: absolute; cursor: pointer; font-size: 14px;" class="fa fa-pencil-square-o"><%= content %></i>'),

    constructEditIcon: function(options) {
      var $edit = $(this.editTemplate(options)).css(options.position).addClass(options.className);
      var data = options.data || [];
      _.each(data, function(value, key){
        $edit.attr('data-'+key, value);
      });

      return $edit;
    },

    initialize: function() {
      this.dialogFactory = new DialogFactory({

      });
      this.listenTo(this.model.get('json'), 'change', this.onChangeStyle);
    },

    events: {
      'click .js-trigger-dialog': 'onTriggerDialog'
    },

    regions: {

    },

    onRender: function() {
      var self = this;
      this.eventDemoView = new EventView({
        el: this.$el,
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

      this.renderEditIcons();
      this.initEditTooltips();
    },

    renderEditIcons: function() {
      this.eventDemoView.ui.title.append(this.constructEditIcon({
        position: {top: 0},
        content: _.template(titleEditToolTip, {})
      }));

      this.eventDemoView.ui.detailContainer.append(this.constructEditIcon({
        position: {top: 0, right: 10},
        content: _.template(detailEditTooltip, {})
      }));
    },

    initEditTooltips: function() {
      var self = this;
      var $tooltip = this.$('.fa-pencil-square-o');

      $tooltip.each(function(){
        var title = $(this).html();
        $(this).html('');

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

    onChangeStyle: function() {
      this.customStyleView.render();
    }
  });

  return View;
})