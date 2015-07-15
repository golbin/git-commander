var _       = require('lodash'),
    blessed = require('blessed'),
    styles  = require('./style/main.json');

// build layout
var screen = blessed.screen(styles.screen);

// bind screen to child elems
_.merge(styles, {
  title   : {
    staged  : {parent: screen},
    unstaged: {parent: screen}
  },
  list    : {
    staged  : {parent: screen},
    unstaged: {parent: screen}
  },
  menubar1: {
    parent: screen
  },
  menubar2: {
    parent: screen
  },
  loading : {
    parent: screen
  },
  popup   : {
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

list.staged.name   = "staged";
list.unstaged.name = "unstaged";

blessed.listbar(styles.menubar1);
blessed.listbar(styles.menubar2);

var loading = blessed.loading(styles.loading);

var popup = blessed.box(styles.popup);

module.exports = {
  screen : screen,
  title  : title,
  list   : list,
  loading: loading,
  popup  : popup
};
