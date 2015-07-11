var blessed = require('blessed'),
    styles  = require('./style/log.json');

var layout  = null,
    list    = null,
    confirm = null,
    menubar = null;

var init = function (screen) {
  styles.layout.parent = screen;

  layout = blessed.layout(styles.layout);

  styles.list.parent    = layout;
  styles.menubar.parent = layout;

  list    = blessed.list(styles.list);
  menubar = blessed.listbar(styles.menubar);

  styles.confirm.parent = screen;

  confirm = blessed.question(styles.confirm);

  return {
    layout : layout,
    list   : list,
    confirm: confirm,
    menubar: menubar
  };
};

module.exports = init;

