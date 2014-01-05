define([
  'underscore'
  , 'marionette'
  , 'views/event_create/information/ticket_type/item'
], function(_, Marionette, TicketTypeView){
  var View = Marionette.CollectionView.extend({
    itemView: TicketTypeView
  });

  return View;
});