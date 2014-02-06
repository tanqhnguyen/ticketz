define([
  'underscore'
  , 'backbone'
  , 'marionette'
], function(_, Backbone, Marionette){
  var View = Marionette.ItemView.extend({
    template: '#eu-ticket-grid-item-template',
    tagName: 'tr',

    serializeData: function(){
      return {
        model: this.model
      };
    },

    events: {
      'click .js-refund-ticket': 'onRefundTicket'
    },

    initialize: function() {
      this.listenTo(this.model, 'change:is_used', this.onChangeStatus);
    },

    onRender: function() {
      
    },

    onRefundTicket: function(e) {
      var self = this;
      var $target = $(e.currentTarget);
      var code = this.model.get('code');

      $target.bsbutton('loading');

      Backbone.callApi('post', 'ticket/refund', {code: code})
      .success(function(response){
        self.model.set('is_used', false);
      })
      .complete(function(){
        $target.bsbutton('reset');  
      });

      return false;    
    },

    onChangeStatus: function(model, newValue) {
      var valid = this.$('.label-success');
      var invalid = this.$('.label-danger');
      if (newValue) {
        valid.addClass('hide');
        invalid.removeClass('hide');
      } else {
        valid.removeClass('hide');
        invalid.addClass('hide');
      }
    }
  });

  return View;
});
