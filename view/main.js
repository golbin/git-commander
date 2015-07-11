var _       = require('lodash'),
    blessed = require('blessed'),
    styles  = require('./style/main.json');

// build layout
var screen = blessed.screen(styles.screen);

// bind screen to child elems
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

list.staged.name = "staged";
list.unstaged.name = "unstaged";

var menubar = blessed.listbar(styles.menubar);

var loading = blessed.loading(styles.loading);

module.exports = {
  screen  : screen,
  title   : title,
  list    : list,
  menubar : menubar,
  loading : loading
};
