var _ = require('lodash');

var defaultConfig = {
    keySet: 'vi'
};

var config = (function() {
    var fs = require('fs');

    var retval = defaultConfig;
    var userHome = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    var configFileName = userHome + '/.config/git-commander/config.json';

    if (configFileName && fs.existsSync(configFileName)) {
        retval = _.extend({}, defaultConfig, JSON.parse(fs.readFileSync(configFileName)));
    }

    return retval;
}());


var keyConfig = require('./key/' + config.keySet + '.json');

module.exports = {
    keys: config.keys ? _.merge({}, keyConfig, config.keys) : keyConfig
};
