define([
  'underscore'
  , 'marionette'
], function(_, Marionette){
  var View = Marionette.ItemView.extend({
    template: '#event-information-template'
  });

  return View;
})