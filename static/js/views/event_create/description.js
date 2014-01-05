define([
  'underscore'
  , 'marionette'
  , 'summernote'
], function(_, Marionette){
  var View = Marionette.ItemView.extend({
    template: '#ec-description-template',
    ui: {
      summernote: '.js-summernote'
    },

    events: {

    },

    initialize: function(options) {
      
    },

    onRender: function() {
      this.model.buildControl({
        attribute: 'description',
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
          ['insert', ['link', 'picture', 'video']],
          ['help', ['help']]
        ],
        height: 200
      });
    }
  });

  return View;
});