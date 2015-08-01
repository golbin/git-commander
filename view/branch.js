var blessed = require('blessed'),
    styles  = require('./style/branch.json');

var layout  = null,
    list    = null,
    menubar = null;

var init = function (screen) {
  styles.layout.parent = screen;

  layout = blessed.layout(styles.layout);

  styles.list.parent    = layout;
  styles.menubar.parent = layout;

  list    = blessed.list(styles.list);
  menubar = blessed.listbar(styles.menubar);

  return {
    layout : layout,
    list   : list,
    menubar: menubar
  };
};

module.exports = init;
