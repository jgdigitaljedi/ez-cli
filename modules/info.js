var files = require('../lib/files');
var shell = require('shelljs');
var libInfo = require('../lib/libInfo');
var inquire = require('inquirer');
var config = require('../system.config');

module.exports = {
  whereAmI: function() {
    files.getFullPath(true);
  },
  hardDriveSpace: function(platform) {
    var unixBased = libInfo.unixOs();
    if (unixBased) {
      shell.exec('df');
    } else {
      inquire.prompt(libInfo.windowsTerminal()).then(function(term) {
        if (term.terminal === 'git-bash') {
          shell.exec('df');
        } else {
          shell.exec('fsutil volume diskfree c:');
        }
      });
    }
  },
  calendar: function(platform) {
    var unixBased = libInfo.unixOs();
    if (unixBased) {
      shell.exec('cal');
    } else {
      console.log('Sorry, Windows does not have this functionality by default.');
    }
  },
  listPrinters: function() {
    var unixBased = libInfo.unixOs();
    if (unixBased) {
      shell.exec('lpstat -p');
    } else {
      console.log('Sorry, the location of this command varies in Windows versions. This would be difficult to support.');
    }
  },
  seeConfig: function() {
    console.log('config', config);
  }
};