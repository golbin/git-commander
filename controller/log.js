var LogView = require('../view/log');
var config = require('../config');

var parent = null,
    view   = null;

var SECONDS_OF_MINUTES = 60,
    SECONDS_OF_HOUR    = 3600,
    SECONDS_OF_DAY     = 86400,
    SECONDS_OF_WEEK    = 604800,
    SECONDS_OF_MONTH   = 2592000;

var logItems = [];

var log = {
  diffDate: function (date1, date2) {
    var unit   = "",
        number = Math.floor((date1 - date2) / 1000);

    if (number < SECONDS_OF_MINUTES) {
      unit = "sec";
    } else if (number < SECONDS_OF_HOUR) {
      unit   = "min";
      number = Math.floor(number / SECONDS_OF_MINUTES);
    } else if (number < SECONDS_OF_DAY) {
      unit   = "hour";
      number = Math.floor(number / SECONDS_OF_HOUR);
    } else if (number < SECONDS_OF_WEEK) {
      unit   = "day";
      number = Math.floor(number / SECONDS_OF_DAY);
    } else if (number < SECONDS_OF_MONTH) {
      unit   = "week";
      number = Math.floor(number / SECONDS_OF_WEEK);
    } else {
      unit   = "month";
      number = Math.floor(number / SECONDS_OF_MONTH);
    }

    return number + " " + unit + (number > 1 ? "s" : "");
  },

  getLogItems: function () {
    var now = new Date();

    logItems = parent.git.log();

    return logItems.reduce(function (formatted, item) {
      var line = " {red-fg}" + item.id.slice(0, 7) + "{/red-fg}";

      line = line + " - ";

      if (item.messages && item.messages[0]) {
        line = line + item.messages[0];
      } else {
        line = line + "No message";
      }

      line = line + " {green-fg}(" + log.diffDate(now, item.date) + "){/green-fg}";

      line = line + " {cyan-fg}<" + item.author.name + ">{/cyan-fg}";

      formatted.push(line);

      return formatted;
    }, []);
  },

  show: function () {
    view.list.setItems(log.getLogItems());

    view.layout.show();
    view.list.focus();
    view.layout.parent.render();
  },

  clear: function () {
    logItems = [];
    view.list.setItems(logItems);
  },

  hide: function (reload) {
    view.layout.hide();
    log.clear();
    parent.show(reload);
  },

  init: function (delegate) {
    parent = delegate;

    view = LogView(parent.screen);

    view.list.key(config.keys.main.reset, function () {
      var item = logItems[view.list.selected];

      view.confirm.ask("Are you sure to reset? (Y/N)\n", function (err, value) {
        if (value === true) {
          parent.git.resetCommit(item.id);

          log.hide(true);
        } else {
          redraw();
        }
      });
    });

    view.list.key(config.keys.common.quit, function () {
      log.hide();
    });

    view.list.key(config.keys.common.pageUp, function () {
      view.list.scroll(-view.list.height || -1);
      redraw();
    });

    view.list.key(config.keys.common.pageDown, function () {
      view.list.scroll(view.list.height || 1);
      redraw();
    });

    view.confirm.key(config.keys.common.quit, function () {
      view.confirm.hide();
    });

  }
};


module.exports = log;

