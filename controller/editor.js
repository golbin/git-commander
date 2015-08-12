var EditorView = require('../view/editor');
var config = require('../config');

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

    view.textarea.key(config.keys.editor.save, function () {
      var message = view.textarea.getValue();

      parent.git.commit(message);

      editor.hide(true);
    });

    view.textarea.key(config.keys.common.quit, function () {
      editor.hide();
    });
  }
};


module.exports = editor;

