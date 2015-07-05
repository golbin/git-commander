var _       = require('lodash'),
    blessed = require('blessed'),
    styles  = require('./styles.json');

// build layout
var screen = blessed.screen(styles.screen);

_.merge(styles, {
  title  : {
    staged  : {parent: screen},
    unstaged: {parent: screen}
  },
  list   : {
    staged  : {parent: screen},
    unstaged: {parent: screen}
  },
  menubar: {
    parent: screen
  },
  loading: {
    parent: screen
  }
});

var title = {
  staged  : blessed.box(styles.title.staged),
  unstaged: blessed.box(styles.title.unstaged)
};

var list = {
  staged  : blessed.list(styles.list.staged),
  unstaged: blessed.list(styles.list.unstaged)
};

var menubar = blessed.listbar(styles.menubar);

var loading = blessed.loading(styles.loading);

// utility functions
var formatItem = function (selected, symbol, file) {
  var prefix = selected ? " * " : "   ";
  return prefix + symbol + " " + file;
};

var buildItemListByType = function (git, type) {
  return _.reduce(git.files[type], function (result, val, index) {
    result.push(formatItem(git.selected[type][index], git.symbols[type][index], val));
    return result;
  }, []);
};

var setItems = function (git) {
  list.staged.setItems(buildItemListByType(git, 'staged'));
  list.unstaged.setItems(buildItemListByType(git, 'unstaged'));
};

var mark = function (markAll) {
  var content = this.getItem(this.selected).content;
  this.setItem(this.selected, " * " + content.substr(3));
};

var unmark = function (unmarkAll) {
  var content = this.getItem(this.selected).content;
  this.setItem(this.selected, "   " + content.substr(3));
};

list.staged.mark     = mark;
list.unstaged.mark   = mark;
list.staged.unmark   = unmark;
list.unstaged.unmark = unmark;

module.exports = {
  screen  : screen,
  title   : title,
  list    : list,
  menubar : menubar,
  loading : loading,
  setItems: setItems
};
