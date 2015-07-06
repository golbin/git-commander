var blessed = require('blessed'),
    styles  = require('./style/editor.json');

var view = {
  layout  : null,
  textarea: null,
  menubar : null
};

var init = function (screen) {
  if (view.layout === null) {
    styles.layout.parent = screen;

    view = {
      layout: blessed.layout(styles.layout)
    };

    styles.textarea.parent = view.layout;
    styles.menubar.parent  = view.layout;

    view.textarea = blessed.textarea(styles.textarea);
    view.menubar  = blessed.listbar(styles.menubar);
  }

  return view;
};

var show = function () {
  if (view.layout !== null) {
    view.layout.show();
    view.textarea.focus();
    view.textarea.readInput();
  }
};

var hide = function () {
  if (view.layout !== null) {
    view.layout.hide();
  }
};

var clear = function () {
  if (view.textarea !== null) {
    view.textarea.clearValue();
  }
};

module.exports = {
  init    : init,
  show    : show,
  hide    : hide,
  clear   : clear,
  textarea: view.textarea
};
