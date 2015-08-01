var _ = require('lodash');

var BranchView = require('../view/branch');

var parent = null,
    view   = null;

var branch = {
  loadBranches: function () {
    return parent.git.loadBranches()
      .map(function (branchName, index) {
        if (index === parent.git.currentBranchIndex) {
          return "  * " + branchName;
        } else {
          return "    " + branchName;
        }
      });
  },

  show: function () {
    view.list.setItems(branch.loadBranches());
    view.list.select(parent.git.currentBranchIndex);

    view.layout.show();
    view.list.focus();
    view.layout.parent.render();
  },

  hide: function (reload) {
    view.layout.hide();
    parent.show(reload);
  },

  init: function (delegate) {
    parent = delegate;

    view = BranchView(parent.screen);

    view.list.key(['enter'], function () {
      try {
        parent.git.checkout(this.selected);
        branch.hide(true);
      } catch (e) {
        branch.hide(true);
        parent.showPopup(_.trim(e.stderr.toString()), 3);
      }
    });

    view.list.key(['C-d'], function () {
      try {
        parent.git.delBranch(this.selected);
        branch.show();
      } catch (e) {
        branch.hide(true);
        parent.showPopup(_.trim(e.stderr.toString()), 3);
      }
    });

    view.list.key(['C-a'], function () {
      view.prompt.input('Input the new branch name', '', function (err, value) {
        try {
          parent.git.addBranch(value);
          branch.show();
        } catch (e) {
          branch.hide(true);
          parent.showPopup(_.trim(e.stderr.toString()), 3);
        }
      });
    });

    view.list.key(['escape'], function () {
      branch.hide();
    });
  }
};

module.exports = branch;

