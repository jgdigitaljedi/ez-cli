var files = require('../lib/files');
var shell = require('shelljs');
var inquire = require('inquirer');
var config = require('../system.config');
var log = require('../lib/log');

module.exports = {
  whereAmI: function() {
    files.getFullPath(true);
  },
  hardDriveSpace: function(platform) {
    var unixBased = config.unix || config.windows.gitBash;
    if (unixBased) {
      shell.exec('df');
      if (config.teachMode) {
        log.teach('df');
      }
    } else {
      shell.exec('fsutil volume diskfree c:');
      if (config.teachMode) {
        log.teach('fsutil volume diskfree c:');
      }
    }
  },
  calendar: function(platform) {
    var unixBased = config.unix || config.windows.gitBash;
    if (unixBased) {
      shell.exec('cal');
      if (config.teachMode) {
        log.teach('cal');
      }
    } else {
      log.warn('Sorry, Windows does not have this functionality by default.');
    }
  },
  listPrinters: function() {
    var unixBased = config.unix || config.windows.gitBash;
    if (unixBased) {
      shell.exec('lpstat -p');
      if (config.teachMode) {
        log.teach('lpstat -p');
      }
    } else {
      log.warn('Sorry, the location of this command varies in Windows versions. This would be difficult to support.');
    }
  },
  seeConfig: function() {
    log.general('config', config);
  }
};