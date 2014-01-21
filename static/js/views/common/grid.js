define([
  'underscore'
  , 'backbone'
  , 'marionette'
  , 'views/common/base_list'
], function(_, Backbone, Marionette, BaseListView){
  var View = BaseListView.extend({
    tagName: 'table',
    className: 'table table-bordered table-hover',

    template: function(data) {
      return '<thead></thead><tbody></tbody><tfoot></tfoot>';
    },

    onRender: function() {
      var headers = Marionette.getOption(this, 'headers');
      if (headers) {
        this.$('thead').html('<tr></tr>');
        var $tr = this.$('thead').find('tr');

        _.each(headers, function(header){
          $tr.append('<th>'+header+'</th>');
        }, this);
      }
    },

    appendPagination: function(paginationEl) {
      var columnCount = this.$('tr:first').find('td').length;
      var headers = Marionette.getOption(this, 'headers');

      columnCount = columnCount || headers.length;

      var $tfoot = this.$('tfoot');
      var $tr = $("<tr></tr>");
      var $td = $("<td></td>");
      $td.attr('colspan', columnCount);
      $td.html(paginationEl);
      $tr.html($td);
      $tfoot.html($tr);
    },

    itemViewContainer: 'tbody'
  });

  return View;
});