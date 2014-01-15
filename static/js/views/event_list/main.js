define([
  'underscore'
  , 'backbone'
  , 'marionette'
  , 'views/common/grid'
  , 'views/event_list/event_grid_item'
], function(_, Backbone, Marionette, GridView, EventGridItemView){
  var View = Marionette.Layout.extend({
    template: '#em-layout-template',

    regions: {
      list: '.js-list'
    },

    onRender: function() {
      var self = this;

      this.collection.list().success(function(){
        var gridView = new GridView({
          headers: ['ID', _.t('Title'), '&nbsp;'],
          itemView: EventGridItemView,
          collection: self.collection,
          pageRange: 19
        });

        self.list.show(gridView);
      });
    }
  });

  return View;
});