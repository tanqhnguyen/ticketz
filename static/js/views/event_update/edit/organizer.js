define([
  'underscore'
  , 'marionette'
  , 'summernote'
], function(_, Marionette){
  var View = Marionette.ItemView.extend({
    template: '#eu-organizer-template',
    ui: {
      summernote: '.js-summernote',
      name: '.js-name'
    },

    events: {

    },

    initialize: function(options) {
      
    },

    onRender: function() {
      this.model.buildControl({
        attribute: 'organizer_name',
        type: 'input',
        el: this.ui.name
      });


      this.model.buildControl({
        attribute: 'organizer_contact',
        type: 'wysiwyg',
        el: this.ui.summernote,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'italic', 'underline', 'clear']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
          ['table', ['table']],
          ['help', ['help']]
        ],
        height: 200
      });
    }
  });

  return View;
});