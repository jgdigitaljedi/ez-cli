'use_strict';

var path = require('path');
var fs = require('fs');
var configPath = ('/../system.config.json');

module.exports = {
    writeConfig: function(newConfig) {
        var configStr = JSON.stringify(newConfig, null, 4);
        fs.writeFileSync(__dirname + configPath, configStr, function(err, data) {
            if (err) {
              console.error('error writing platform to config', err);
            }
          });
    }
}
