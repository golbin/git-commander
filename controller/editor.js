var editorView = require('../view/editor');

var parent      = null,
    prevFocused = null;

var editor = {
  show: function () {
    prevFocused = parent.focused;
    editorView.show();
    parent.render();
  },

  hide: function () {
    editorView.hide();
    editorView.clear();
    prevFocused.focus();
    parent.render();
  },

  init: function (delegate) {
    parent = delegate.screen;

    var view = editorView.init(parent);

    view.textarea.key(['C-s'], function () {
      var message = view.textarea.getValue();

      delegate.commit(message);

      editor.hide();
    });

    view.textarea.key(['escape'], function () {
      editor.hide();
    });
  }
};


module.exports = editor;

