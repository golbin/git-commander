var _ = require('lodash');

var Git  = require('../model/git'),
    view = require('../view/main');

var editor = require('./editor'),
    branch = require('./branch'),
    log    = require('./log'),
    diff   = require('./diff');

var config = require('../config');

// model control
var git = new Git(__dirname);

// for convenience.
// use just call redraw() anywhere if need screen.render()
global.redraw = function () {
  view.screen.render();
};

var main = {
  git   : git,
  screen: view.screen,

  moveToStaged: function (index) {
    view.list.staged.interactive   = true;
    view.list.unstaged.interactive = false;
    view.list.staged.select(index !== undefined ? index : view.list.unstaged.selected);
    view.list.staged.focus();
    redraw();
  },

  moveToUnstaged: function (index) {
    view.list.staged.interactive   = false;
    view.list.unstaged.interactive = true;
    view.list.unstaged.select(index !== undefined ? index : view.list.staged.selected);
    view.list.unstaged.focus();
    redraw();
  },

  next: function () {
    this.move(1);
    redraw();
  },

  // TODO: Fix crash if there is no item
  toggle: function () {
    var selected = git.isSelected(this.name, this.selected);

    if (selected) {
      git.deselect(this.name, this.selected);
      main.unmark.call(this);
    } else {
      git.select(this.name, this.selected);
      main.mark.call(this);
    }

    redraw();
  },

  selectAll: function () {
    var type = view.list.staged.focused ? view.list.staged.name : view.list.unstaged.name;

    var selected = git.isSelected(type);

    if (selected) {
      git.deselect(type);
      main.setItems(git);
    } else {
      git.select(type);
      main.setItems(git);
    }

    redraw();
  },

  lockScreen: function () {
    main.prevFocused = view.screen.focused;
  },

  unlockScreen: function () {
    if (main.prevFocused) {
      main.prevFocused.focus();
    }
  },

  show: function (controller) {
    if (_.isBoolean(controller) && controller === true) {
      main.reload();
      redraw();
    } else if (_.isObject(controller)) {
      main.lockScreen();
      controller.show();
    } else {
      main.unlockScreen();
      redraw();
    }
  },

  // initialize
  reload: function () {
    git.status();

    view.branchbox.setText(git.getCurrentBranchName());

    main.setItems();

    main.moveToUnstaged(0);

    view.loading.stop();

    redraw();
  },

  // utility functions
  formatItem: function (selected, symbol, file) {
    var prefix = selected ? " * " : "   ";
    return prefix + symbol + " " + file;
  },

  buildItemListByType: function (type) {
    return _.reduce(git.files[type], function (result, val, index) {
      result.push(main.formatItem(git.selected[type][index], git.symbols[type][index], val));
      return result;
    }, []);
  },

  setItems: function () {
    view.list.staged.setItems(main.buildItemListByType('staged'));
    view.list.unstaged.setItems(main.buildItemListByType('unstaged'));
  },

  mark: function () {
    var selectedItem = this.getItem(this.selected);
    if (selectedItem === undefined) {
      return;
    }

    var content = selectedItem.content;
    this.setItem(this.selected, " * " + content.substr(3));
  },

  unmark: function () {
    var selectedItem = this.getItem(this.selected);
    if (selectedItem === undefined) {
      return;
    }

    var content = this.getItem(this.selected).content;
    this.setItem(this.selected, "   " + content.substr(3));
  },

  showPopup: function (msg, hideAfter) {
    view.popup.content = msg;
    view.popup.hidden  = false;
    redraw();

    setTimeout(main.hidePopup, hideAfter ? hideAfter : 1000);
  },

  hidePopup: function () {
    view.popup.hidden = true;
    redraw();
  }
};

// bind editor
editor.init(main);

// bind log viewer
log.init(main);

// bind diff viewer
diff.init(main);

// bind branch viewer
branch.init(main);

// bind keys
// TODO: Need to refactor
_.each(view.list, function (elem) {
  elem.key(config.keys.main.select, function () {
    main.toggle.call(this);
    main.next.call(this);
  });

  elem.key(config.keys.main.selectAll, function () {
    main.selectAll();
  });

  elem.key(config.keys.main.quit, function () {
    return process.exit(0);
  });

  elem.key(config.keys.common.pageUp, function () {
    elem.move(-(elem.height - elem.iheight));
    redraw();
  });

  elem.key(config.keys.common.pageDown, function () {
    elem.move(elem.height - elem.iheight);
    redraw();
  });

  // git commands
  elem.key(config.keys.main.add, function () {
    if (!view.list.unstaged.focused) {
      main.showPopup("It cannot work on Staged list");
      return;
    }

    if (git.selectedFiles('unstaged').length === 0) {
      main.showPopup("Please select a file or files");
      return;
    }

    git.add();
    main.reload();
  });

  elem.key(config.keys.main.reset, function () {
    git.reset();
    main.reload();
  });

  elem.key(config.keys.main.commit, function () {
    if (git.getStagedFiles().length < 1) {
      main.showPopup("You need to stage files first");
      return;
    }

    main.show(editor);
  });

  elem.key(config.keys.main.log, function () {
    main.show(log);
  });

  elem.key(config.keys.main.diff, function () {
    if (this.getItem(this.selected) === undefined) {
      main.showPopup("There is no diff file you selected");
      return;
    }

    main.show(diff);
  });

  elem.key(config.keys.main.showBranch, function () {
    main.show(branch);
  });

  elem.key(config.keys.main.togglePanes, function () {
    if (view.list.staged.interactive) {
      main.moveToUnstaged();
    } else {
      main.moveToStaged();
    }
  });

  elem.key(config.keys.main.leftPane, function () {
    main.moveToStaged();
  });

  elem.key(config.keys.main.leftPane, function () {
    main.moveToUnstaged();
  });
});

module.exports = main;
