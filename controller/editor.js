var EditorView = require('../view/editor');

var parent = null,
    view   = null;

var editor = {
  show: function () {
    view.layout.show();
    view.textarea.focus();
    view.textarea.readInput();
    view.layout.parent.render();
  },

  hide: function (reload) {
    view.layout.hide();
    view.textarea.clearValue();
    parent.show(reload);
  },

  init: function (delegate) {
    parent = delegate;

    view = EditorView(parent.screen);

    view.textarea.key(['C-s'], function () {
      var message = view.textarea.getValue();

      parent.git.commit(message);

      editor.hide(true);
    });

    view.textarea.key(['escape'], function () {
      editor.hide();
    });
  }
};


module.exports = editor;

