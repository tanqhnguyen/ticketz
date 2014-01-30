define([
  'underscore'
  , 'backbone'
  , 'marionette'
  , 'collections/events'
  , 'collections/tickets'
  , 'views/common/grid'
  , 'views/event_list/event_grid_item'
  , 'views/event_list/recent_purchase_item'
], function(_, Backbone, Marionette, Events, Tickets, GridView, EventGridItemView, RecentPurchaseItemView){
  var View = Marionette.Layout.extend({
    template: '#em-layout-template',

    regions: {
      draft: '#draft',
      live: '#live',
      recentPurchase: '#recent-purchase'
    },

    initialize: function(options) {
      this.draftEvents = new Events();
      this.liveEvents = new Events();
      this.recentTickets = new Tickets();
    },

    onRender: function() {
      var self = this;
      this.loadDraftEvents();
      this.loadLiveEvents();
      this.loadRecentPurchases();
    },

    loadDraftEvents: function() {
      var self = this;
      var data = {
        active: false
      }

      this.draftEvents.list({
        data: data
      }).success(function(){
        var gridView = new GridView({
          headers: ['ID', _.t('Title'), '&nbsp;'],
          itemView: EventGridItemView,
          collection: self.draftEvents,
          pageRange: 9,
          data: data,
          className: 'table table-hover'
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
          data: data,
          className: 'table table-hover'
        });

        self.live.show(gridView);
      });
    },

    loadRecentPurchases: function() {
      var self = this;
      var data = {
        order: {
          created_date: 'desc'
        }
      }

      this.recentTickets.list({
        data: data
      }).success(function(){
        var gridView = new Marionette.CollectionView({
          itemView: RecentPurchaseItemView,
          collection: self.recentTickets
        });

        self.recentPurchase.show(gridView);
      });
    }
  });

  return View;
});