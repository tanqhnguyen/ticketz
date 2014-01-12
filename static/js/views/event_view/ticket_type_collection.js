define([
  'underscore'
  , 'marionette'
  , 'views/event_view/ticket_type_item'
], function(_, Marionette, TicketTypeView){
  var View = Marionette.CollectionView.extend({
    itemView: TicketTypeView
  });

  return View;
});