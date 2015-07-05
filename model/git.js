var _       = require('lodash'),
    Q       = require('q'),
    process = require('child_process');

// TODO: get git command from shell
var gitExec = 'git';

function Git (path) {
  this.path = path;
  this.repo = null;
}

Git.prototype.clear = function () {
  this.files = {
    staged  : [],
    unstaged: []
  };

  this.selected = {
    staged  : [],
    unstaged: []
  };

  this.symbols = {
    staged  : [],
    unstaged: []
  };
};

Git.prototype.setStatus = function (code, path) {
  if (code.charAt(0) !== '?' && code.charAt(0) !== ' ') {
    this.files.staged.push(path);
    this.selected.staged.push(false);
    this.symbols.staged.push(code.charAt(0));
  }

  if (code.charAt(1) !== ' ') {
    this.files.unstaged.push(path);
    this.selected.unstaged.push(false);
    this.symbols.unstaged.push(code.charAt(1));
  }
};

Git.prototype.parseStatus = function (stdout) {
  return stdout.split('\n')
    .reduce(function (result, row) {
      if (row !== '') {
        result.push({
          code: row.substr(0, 2),
          path: row.substr(3)
        });
      }

      return result;
    }, []);
};

Git.prototype.convertStatus = function (stdout) {
  var self   = this,
      status = this.parseStatus(stdout);

  _.each(status, function (item) {
    self.setStatus(item.code, item.path);
  });
};

Git.prototype.status = function () {
  var self = this;

  this.clear();

  var deferred = Q.defer();

  process.exec('git status -su', function (err, stdout, stderr) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(self.convertStatus(stdout));
    }
  });

  return deferred.promise;
};

Git.prototype.isSelected = function (type, index) {
  if (index !== undefined) {
    return this.selected[type][index];
  } else {
    return _.every(this.selected[type], function (selected) {
      return selected;
    });
  }
};

Git.prototype.select = function (type, index) {
  if (index !== undefined) {
    this.selected[type][index] = true;
  } else {
    for (var i = 0; i < this.selected[type].length; i++) {
      this.selected[type][i] = true;
    }
  }
};

Git.prototype.deselect = function (type, index) {
  if (index !== undefined) {
    this.selected[type][index] = false;
  } else {
    for (var i = 0; i < this.selected[type].length; i++) {
      this.selected[type][i] = false;
    }
  }
};

Git.prototype.selectedFiles = function (type) {
  var selectedFiles = [];

  for (var i = 0; i < this.selected[type].length; i++) {
    if (this.selected[type][i] === true) {
      selectedFiles.push('"' + this.files[type][i] + '"');
    }
  }

  return selectedFiles.join(' ');
};

Git.prototype.commandWithFiles = function (command, type) {
  var files    = this.selectedFiles(type),
      deferred = Q.defer();

  var gitCommand = gitExec + ' ' + command + ' ' + files;

  process.exec(gitCommand, function (err, stdout, stderr) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(stdout);
    }
  });

  return deferred.promise;
};

Git.prototype.add = function () {
  return this.commandWithFiles('add', 'unstaged');
};

Git.prototype.reset = function () {
  return this.commandWithFiles('reset', 'staged');
};

module.exports = Git;
