define([
  'underscore'
  , 'marionette'
], function(_, Marionette){
  return Marionette.ItemView.extend({
    template: '#up-layout-template',

    events: {
      'submit form': 'onSubmitForm'
    },

    serializeData: function() {
      return {
        model: this.model
      };
    },

    initialize: function() {
      this.setupNotyAlertListeners();
    },

    onRender: function() {
      this.model.buildControl({
        attribute: 'first_name',
        type: 'input',
        el: $('#first_name')
      });

      this.model.buildControl({
        attribute: 'last_name',
        type: 'input',
        el: $('#last_name')
      });

      this.model.buildControl({
        attribute: 'email',
        type: 'input',
        el: $('#email')
      });
    },

    onSubmitForm: function(e) {
      var $target = $(e.currentTarget);
      var $button = $target.find('button');
      $button.bsbutton('loading');
      this.model.save({
        current_password: $('#current_password').val() || null,
        new_password: $('#new_password').val() || null,
      }).success(function(){

      }).complete(function(){
        $button.bsbutton('reset');
      });
      return false;
    }
  });
});