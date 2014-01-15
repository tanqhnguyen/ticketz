define([
  'underscore'
  , 'backbone'
  , 'marionette'
], function(_, Backbone, Marionette){
  var View = Marionette.CompositeView.extend({
    pageRange: 10,
    data: {},

    constructor: function() {
      Marionette.CompositeView.apply(this, arguments);

      this.bind('render', this.bindInternalEvent);
      this.bind('changePage', this._changePage);
      this.bind('composite:collection:rendered', this._renderPagination);
    },

    bindInternalEvent: function() {
      var self = this;
      this.$el.on('click', '.js-change-page', function(e){
        var page = _.last($(e.currentTarget).attr('href').split('#'));
        page = parseInt(page);
        self.triggerMethod('changePage', page);
        e.preventDefault();
      });

      this.$el.on('click', '.js-last', function(e){
        self.triggerMethod('changePage', self.totalPage);
        e.preventDefault();
      });

      this.$el.on('click', '.js-prev', function(e){
        self.triggerMethod('changePage', --self.currentPage);
        e.preventDefault();
      });

      this.$el.on('click', '.js-next', function(e){
        self.triggerMethod('changePage', ++self.currentPage);
        e.preventDefault();
      });

      this.$el.on('click', '.js-first', function(e){
        self.triggerMethod('changePage', 1);
        e.preventDefault();
      });
    },

    _changePage: function(page) {
      var self = this;
      var pagination = this.collection.pagination;
      var offset = (page - 1)*pagination.limit;

      var data = _.extend({
        offset: offset,
        limit: pagination.limit
      }, Marionette.getOption(this, 'data'));

      this.collection.list({
        data: data
      }).success(function(){
        self._renderPagination();
      });
    },

    _renderPagination: function() {
      var paginationData = this.calculatePaginationData();
      var $ul = $('<ul></ul>');
      $ul.addClass('pagination');

      var nav = '<li><a href="#"><i style="line-height: 18px;" class="fa"></i></a></li>';
      var $first = $(nav);
      $first.find('a').addClass('js-first')
      $first.find('i').addClass('fa-angle-double-left');

      var $last = $(nav);
      $last.find('a').addClass('js-last');
      $last.find('i').addClass('fa-angle-double-right');

      var $prev = $(nav);
      $prev.find('a').addClass('js-prev');
      $prev.find('i').addClass('fa-angle-left');

      var $next = $(nav);
      $next.find('a').addClass('js-next');
      $next.find('i').addClass('fa-angle-right');

      if (this.currentPage == 1) {
        $first.addClass('disabled');
        $prev.addClass('disabled');
      }

      if (this.currentPage == this.totalPage) {
        $last.addClass('disabled');
        $next.addClass('disabled');
      }

      $ul.append($first).append($prev);
      for (var i = paginationData.minPage; i <= paginationData.maxPage; i++) {
        var $li = $('<li></li>');
        var $a = $('<a></a>');
        $a.attr('href', '#'+i).addClass('js-change-page').text(i);

        $li.html($a);
        if (i == paginationData.currentPage) {
          $li.addClass('active');
        }
        $ul.append($li);
      }
      $ul.append($next).append($last);

      this.appendPagination($ul);
    },

    appendPagination: function(paginationEl) {
      var paginationContainer = Marionette.getOption(this, 'paginationContainer');
      this.$(paginationContainer).html(paginationEl);
    },

    calculatePaginationData: function() {
      var total = this.collection.pagination.total;
      var offset = this.collection.pagination.offset;
      var limit = this.collection.pagination.limit;

      var totalPage = Math.ceil(total/limit);
      var currentPage = Math.ceil(offset/limit)+1;
      this.currentPage = currentPage;
      this.totalPage = totalPage;

      var startOffset = parseInt(offset);
      var endOffset = parseInt(offset) + this.collection.size();

      if (totalPage === 0) {
        totalPage = 1;
      }

      var pageRange = Marionette.getOption(this, 'pageRange');
      var minPage = currentPage - parseInt(pageRange / 2);
      if (minPage <= 0) {
        minPage = 1;
      }

      var maxPage = minPage + pageRange;

      if (maxPage >= totalPage + 1) {
        maxPage = totalPage;
        minPage = maxPage - pageRange;
      }

      if (minPage <= 0) {
        minPage = 1;
      }

      return {
        totalPage: totalPage,
        minPage: minPage,
        maxPage: maxPage,
        currentPage: currentPage
      };
    }
  });

  return View;
});