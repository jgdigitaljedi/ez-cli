'use_strict';
var os = require('os');
var fs = require('fs');
var config = require('../system.config.json');
var configMethods = require('../lib/configMethods');

module.exports = {
  currentPlatform: function() {
    if (!config.platform) {
      var plat = os.platform();
      config.platform = plat;
      configMethods.writeConfig(config);
      return plat;
    } else {
      return config.platform;
    }
  },
  unixOs: function() {
    var currPlatform = this.currentPlatform();
    return (currPlatform === 'linux' || currPlatform === 'darwin' || currPlatform === 'freebsd');
  },
  windowsTerminal: function() {
    return [{
      name: 'terminal',
      message: 'Are you using git-bash or Windows CMD?',
      type: 'list',
      choices: ['git-bash', 'Windows CMD'],
      default: 0
    }];
  }
};