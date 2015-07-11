var blessed = require('blessed'),
    styles  = require('./style/diff.json');

var layout   = null,
    textarea = null,
    menubar  = null;

var init = function (screen) {
  styles.layout.parent = screen;

  layout = blessed.layout(styles.layout);

  styles.textarea.parent = layout;
  styles.menubar.parent  = layout;

  textarea = blessed.textarea(styles.textarea);
  menubar  = blessed.listbar(styles.menubar);

  return {
    layout  : layout,
    textarea: textarea,
    menubar : menubar
  };
};

module.exports = init;
