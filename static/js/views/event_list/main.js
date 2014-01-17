define([
  'underscore'
  , 'backbone'
  , 'marionette'
  , 'collections/events'
  , 'views/common/grid'
  , 'views/event_list/event_grid_item'
], function(_, Backbone, Marionette, Events, GridView, EventGridItemView){
  var View = Marionette.Layout.extend({
    template: '#em-layout-template',

    regions: {
      draft: '#draft',
      live: '#live'
    },

    initialize: function(options) {
      this.draftEvents = new Events();
      this.liveEvents = new Events();
    },

    onRender: function() {
      var self = this;
      this.loadDraftEvents();
      this.loadLiveEvents();
    },

    loadDraftEvents: function() {
      var self = this;
      var data = {
        active: false,
        filters: [1,2,3],
        sort: {
          title: true,
          date_created: false
        }
      }

      this.draftEvents.list({
        data: data
      }).success(function(){
        var gridView = new GridView({
          headers: ['ID', _.t('Title'), '&nbsp;'],
          itemView: EventGridItemView,
          collection: self.draftEvents,
          pageRange: 9,
          data: data
        });

        self.draft.show(gridView);
      });
    },

    loadLiveEvents: function() {
      var self = this;
      var data = {
        active: true
      }

      this.liveEvents.list({
        data: data
      }).success(function(){
        var gridView = new GridView({
          headers: ['ID', _.t('Title'), '&nbsp;'],
          itemView: EventGridItemView,
          collection: self.liveEvents,
          pageRange: 9,
          data: data
        });

        self.live.show(gridView);
      });
    }
  });

  return View;
});