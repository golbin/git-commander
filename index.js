var Git      = require('./model/git'),
    mainView = require('./view/main');

// model control
var git = new Git(__dirname);

// view control
mainView.screen.key(['escape'], function () {
  return process.exit(0);
});

var moveToStaged = function (index) {
  mainView.list.staged.interactive   = true;
  mainView.list.unstaged.interactive = false;
  mainView.list.staged.select(index !== undefined ? index : mainView.list.unstaged.selected);
  mainView.list.staged.focus();
  mainView.screen.render();
};

var moveToUnstaged = function (index) {
  mainView.list.staged.interactive   = false;
  mainView.list.unstaged.interactive = true;
  mainView.list.unstaged.select(index !== undefined ? index : mainView.list.staged.selected);
  mainView.list.unstaged.focus();
  mainView.screen.render();
};

mainView.screen.key(['left'], function () {
  moveToStaged();
});

mainView.screen.key(['right'], function () {
  moveToUnstaged();
});

// TODO: Fix crash if there is no item
var toggle = function (type, list) {
  var selected = git.isSelected(type, list.selected);

  if (selected) {
    git.deselect(type, list.selected);
    list.unmark();
  } else {
    git.select(type, list.selected);
    list.mark();
  }

  mainView.screen.render();
};

var selectAll = function (type, list) {
  var selected = git.isSelected(type);

  if (selected) {
    git.deselect(type);
    mainView.setItems(git);
  } else {
    git.select(type);
    mainView.setItems(git);
  }

  mainView.screen.render();
};

mainView.list.staged.key(['space'], function () {
  toggle('staged', this);
});

mainView.list.staged.key(['enter'], function () {
  selectAll('staged', this);
});

mainView.list.unstaged.key(['space'], function () {
  toggle('unstaged', this);
});

mainView.list.unstaged.key(['enter'], function () {
  selectAll('unstaged', this);
});

// initialize
var reload = function () {
  git.status();

  mainView.setItems(git);

  moveToUnstaged(0);

  mainView.loading.stop();
};

reload();

// git commands
mainView.screen.key(['C-a'], function () {
  mainView.loading.load('excuting...');

  git.add();

  reload();
});

mainView.screen.key(['C-r'], function () {
  mainView.loading.load('excuting...');

  git.reset();

  reload();
});

mainView.screen.key(['C-c'], function () {
  return process.exit(0);
});

mainView.screen.key(['C-p'], function () {
  return process.exit(0);
});
