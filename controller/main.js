var _ = require('lodash');

var Git  = require('../model/git'),
    view = require('../view/main');

var editor = require('./editor'),
    log    = require('./log'),
    diff   = require('./diff');

// model control
var git = new Git(__dirname);

var main = {
  git   : git,
  screen: view.screen,

  moveToStaged: function (index) {
    view.list.staged.interactive   = true;
    view.list.unstaged.interactive = false;
    view.list.staged.select(index !== undefined ? index : view.list.unstaged.selected);
    view.list.staged.focus();
    view.screen.render();
  },

  moveToUnstaged: function (index) {
    view.list.staged.interactive   = false;
    view.list.unstaged.interactive = true;
    view.list.unstaged.select(index !== undefined ? index : view.list.staged.selected);
    view.list.unstaged.focus();
    view.screen.render();
  },

  next: function () {
    this.move(1);
    view.screen.render();
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

    view.screen.render();
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

    view.screen.render();
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
      view.screen.render();
    } else if (_.isObject(controller)) {
      main.lockScreen();
      controller.show();
    } else {
      main.unlockScreen();
      view.screen.render();
    }
  },

  // initialize
  reload: function () {
    git.status();

    main.setItems();

    main.moveToUnstaged(0);

    view.loading.stop();

    view.screen.render();
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
  }
};

// bind editor
editor.init(main);

// bind log viewer
log.init(main);

// bind diff viewer
diff.init(main);

// bind keys
// TODO: Need to refactor
_.each(view.list, function (elem) {
  elem.key(['space'], function () {
    main.toggle.call(this);
    main.next.call(this);
  });

  elem.key(['enter'], function () {
    main.selectAll();
  });

  elem.key(['escape', 'q'], function () {
    return process.exit(0);
  });

  // git commands
  elem.key(['C-a'], function () {
    git.add();
    main.reload();
  });

  elem.key(['C-r'], function () {
    git.reset();
    main.reload();
  });

  elem.key(['C-c'], function () {
    if (git.getStagedFiles().length < 1) {
      // TODO: alert
      return;
    }

    main.show(editor);
  });

  elem.key(['C-l'], function () {
    main.show(log);
  });

  //elem.unkey(['C-d']);

  elem.key(['C-d'], function () {
    main.show(diff);
  });

  elem.key(['left'], function () {
    main.moveToStaged();
  });

  elem.key(['right'], function () {
    main.moveToUnstaged();
  });
});

module.exports = main;

