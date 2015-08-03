var defaultConfig = {
    keys: 'vi'
};

var config = (function() {
    var fs = require('fs'),
        _ = require('lodash');

    var retval = defaultConfig;
    var configFileName = process.env.GIT_COMMANDER_CONFIG;

    if (configFileName && fs.existsSync(configFileName)) {
        retval = _.extend({}, defaultConfig, JSON.parse(fs.readFileSync(configFileName)));
    }

    return retval;
}());

var keyConfig = require('./key/' + config.keys + '.json');

module.exports = {
    keys: keyConfig
};
