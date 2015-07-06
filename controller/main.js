var Git      = require('../model/git'),
    mainView = require('../view/main');

var editor = require('./editor');

// model control
var git = new Git(__dirname);

var main = {
  screen: mainView.screen,

  moveToStaged: function (index) {
    mainView.list.staged.interactive   = true;
    mainView.list.unstaged.interactive = false;
    mainView.list.staged.select(index !== undefined ? index : mainView.list.unstaged.selected);
    mainView.list.staged.focus();
    mainView.screen.render();
  },

  moveToUnstaged: function (index) {
    mainView.list.staged.interactive   = false;
    mainView.list.unstaged.interactive = true;
    mainView.list.unstaged.select(index !== undefined ? index : mainView.list.staged.selected);
    mainView.list.unstaged.focus();
    mainView.screen.render();
  },

  // TODO: Fix crash if there is no item
  toggle: function (type, list) {
    var selected = git.isSelected(type, list.selected);

    if (selected) {
      git.deselect(type, list.selected);
      list.unmark();
    } else {
      git.select(type, list.selected);
      list.mark();
    }

    mainView.screen.render();
  },

  selectAll: function (type) {
    var selected = git.isSelected(type);

    if (selected) {
      git.deselect(type);
      mainView.setItems(git);
    } else {
      git.select(type);
      mainView.setItems(git);
    }

    mainView.screen.render();
  },

  // initialize
  reload: function () {
    git.status();

    mainView.setItems(git);

    main.moveToUnstaged(0);

    mainView.loading.stop();
  },

  commit: function (message) {
    // TODO: Check other exceptions

    git.commit(message);

    main.reload();
  }
};

// bind editor
editor.init(main);

// event binding
mainView.screen.key(['escape'], function () {
  return process.exit(0);
});

mainView.screen.key(['left'], function () {
  main.moveToStaged();
});

mainView.screen.key(['right'], function () {
  main.moveToUnstaged();
});

mainView.list.staged.key(['space'], function () {
  main.toggle('staged', this);
});

mainView.list.staged.key(['enter'], function () {
  main.selectAll('staged', this);
});

mainView.list.unstaged.key(['space'], function () {
  main.toggle('unstaged', this);
});

mainView.list.unstaged.key(['enter'], function () {
  main.selectAll('unstaged', this);
});

// git commands
mainView.screen.key(['C-a'], function () {
  git.add();

  main.reload();
});

mainView.screen.key(['C-r'], function () {
  git.reset();

  main.reload();
});

mainView.screen.key(['C-c'], function () {
  if (git.getStagedFiles().length < 1) {
    // TODO: alert
    return;
  }

  editor.show();
});

mainView.screen.key(['C-p'], function () {
  // Push
});


module.exports = main;

