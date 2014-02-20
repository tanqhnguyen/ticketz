define([
  'underscore'
  , 'marionette'
], function(_, Marionette){
  var ItemView = Marionette.ItemView.extend({
    template: '#es-item-template',

    className: 'search-result-entry col-sm-4',

    serializeData: function() {
      return {
        model: this.model
      }
    }
  });

  var View = Marionette.CollectionView.extend({
    itemView: ItemView
  });

  return View;
})