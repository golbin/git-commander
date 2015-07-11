var DiffView = require('../view/diff');

var parent = null,
    view   = null;

var diff = {
  show: function () {
    var diffText = parent.git.diff(
      parent.prevFocused.name,
      parent.prevFocused.selected
    );

    view.textarea.setValue(diffText);
    view.textarea.scrollTo(0);

    view.layout.show();
    view.textarea.focus();
    view.layout.parent.render();
  },

  hide: function (reload) {
    view.layout.hide();
    view.textarea.clearValue();
    parent.show(reload);
  },

  init: function (delegate) {
    parent = delegate;

    view = DiffView(parent.screen);

    view.textarea.key(['escape', 'q'], function () {
      diff.hide();
    });
  }
};

module.exports = diff;

