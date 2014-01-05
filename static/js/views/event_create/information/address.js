define([
  'underscore'
  , 'marionette'
], function(_, Marionette){
  var View = Marionette.ItemView.extend({
    template: '#ec-address-template',
    className: 'form-group',

    onRender: function() {
      
    }
  });

  return View;
})