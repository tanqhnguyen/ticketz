define([
  'underscore'
  , 'marionette'
  , 'views/event_search/search_results'
], function(_, Marionette, SearchResultsView){
  var View = Marionette.ItemView.extend({
    template: function() {
      
    },

    ui: {
      results: '.js-results'
    },

    onRender: function() {
      this.results = new SearchResultsView({
        el: this.ui.results,
        collection: this.collection
      });

      this.results.render();
    }
  });

  return View;
})