(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', 'bootstrap.tab'], factory);
  } else {
    Backbone.Maze = Backbone.Maze || {};
    Backbone.Maze.BootstrapTabView = factory(_, Backbone);
  }
}(this, function (_, Backbone) {
  "option strict";

  Backbone.Maze = Backbone.Maze || {};
  Backbone.Maze.BootstrapTabView = Backbone.View.extend({
    defaults: {
      layout: '<ul class="nav"></ul><div class="tab-content"></div>',
      toggle: 'tabs',
      initial: false,
      fade: false,
      justified: false,
      tabs: {}
    },

    tabPaneTemplate: '<div class="tab-pane"></div>', 
    tabNavTemplate: '<li><a data-toggle="tab"></a></li>',

    initialize: function(options) {
      _.each(this.defaults, function(value, key){
        this[key] = _.isUndefined(options[key])? value: options[key];
      }, this);
    },

    render: function() {
      this._tabs = {};

      this._processTabLayout();
      this._processTabContent();
      var $target = this.$('ul').find('li:first a');

      if (this.initial) {
        $target = this.$('a[href=#'+this._slugify(this.initial));
      }

      $target.tab('show');
      var $pane = this.$('.tab-content').find('.tab-pane:first');
      if (this.initial) {
        $pane = this.$('#'+this.initial);
      }
      $pane.addClass('active');
    },

    // private stuff
    _processTabLayout: function() {
      var $layout = $(this._extractHtml(this.layout));
      this.$el.html($layout);
      
      this.$('ul')
             .attr('id', 'tab-'+this.cid)
             .addClass('nav-'+this.toggle);

      if (this.justified) {
        this.$('ul').addClass('nav-justified');
      }

      return $layout;
    },

    _processTabContent: function() {
      _.each(this.tabs, function(content, title){
        this.addTab(title, content);
      }, this);
    },

    _constructTabNav: function(title, options) {
      var $nav = $(this.tabNavTemplate);
      $nav.find('a').attr('href', '#'+this._slugify(title))
                           .html(title);
      return $nav;
    },

    _addTabNav: function(title, options) {
      options = options || {};
      var $target = this.$('ul')
        , method = 'append'
        , $nav = this._constructTabNav.apply(this, arguments);

      if (options.position && options.position.place && options.position.tab) {
        $target = this.$('ul').find('a[href=#' + options.position.tab + ']');
        if (options.position.place == 'before') {
          method = 'before';
        } else {
          method = 'after';
        }
      }

      $target[method].apply($target, [$nav]);
    },

    _constructTabPane: function(title, content) {
      var $pane = $(this.tabPaneTemplate);
      return $pane.attr('id', this._slugify(title))
                  .html(this._extractHtml(content));
    },

    _addTabPane: function(title, content, options) {
      options = options || {};
      var $target = this.$('.tab-content')
        , method = 'append';

      $target[method].apply($target, [this._constructTabPane.apply(this, arguments)]);
    },

    _removeTabNav: function(title) {
      this.$('.tab-content ' + '#' + title).remove();
    },

    _removeTabPane: function(title) {

    },

    _extractHtml: function(value) {
      if (value instanceof Backbone.View) {
        value.render();
        return value.$el;
      }
      return value;
    },

    _slugify: function(url) {
      return url.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
    },

    // public methods
    addTab: function(title, content, options) {
      options = options || {};
      var tabContent = this.getTab(title);
      if (tabContent) {
        this.removeTab(title);
      }
      this._addTabNav(title, options);
      this._addTabPane(title, content, options);
    },

    getTab: function(title) {
      return this._tabs[title];
    },

    removeTab: function(title) {
      var tab = this._tabs[title];
      if (tab instanceof Backbone.View) {
        tab.remove();
      } else {
        this._removeTabPane(title);  
      }

      delete this._tab[title];
      this._removeTabNav(title);      

      return this;
    }
  });
  

  return Backbone.Maze.BootstrapTabView;
}));

// var tab = new TabView({
//   layout: new TabLayoutView(),
//   layout: $('#tab-layout').html(),
//   tabs: {
//     'Home': new HomeView(),
//     'Dropdown': {
//       'Title1': new TitleView(),
//       'Exit': new ExitView()
//     },
//     'Static': $('#static').html()
//   },
//   initial: 'Home',
//   toggle: 'tab|pill',
//   fade: true|false,
// })

// a.listenTo(tab, 'show');
// a.listenTo(tab, 'shown');