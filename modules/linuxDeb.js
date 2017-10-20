'use strict';

var exec = require('child_process').exec;
var inquire = require('inquirer');
var config = require('../system.config');
var log = require('../lib/log');

var sudoPrompt = {
  name: 'sudo',
  type: 'confirm',
  message: 'THIS COMMAND REQUIRES SUDO. YOU WILL BE PROMPTED FOR YOUR PASSWORD IF YOU PROCEED!',
  default: false
};

var versionCheck = 'lsb_release -ds 2>/dev/null || cat /etc/*release 2>/dev/null | head -n1 || uname -om';

function execCommand(command, event) {
  return new Promise((resolve, reject) => {
    exec(command).stdout.on(event, function(result) {
      resolve(result);
    });
  });
}

function versionHandling(data, endCommand) {
  var version = data.toLowerCase();
  if (version.indexOf('ubuntu') >= 0 || version.indexOf('debian') >= 0) {
    if (!config.linux.version) {
      config.linux.version = version;
    }
    if (!config.linux.packageManager) {
      config.linux.packageManager = 'debian';
    }
    aptGet(endCommand);
  } else  {
    // check for other linux versions and associate with package manager and update command
    // gonna tak some research as I don't know all of the different update commands
    // I think arch and manjaro is pacman -Syu if I remember correctly
  }
}

function aptGet(command) {
  exec('sudo apt-get ' + command).stdout.on('data', function(data) {
    console.log(data); // not a log thing, outputting the apt-get progress
    if (config.teachMode) {
      log.teach('sudo apt-get ' + command);
    }
  });
}

module.exports = {
  getUpdates: function() {
    inquire.prompt([sudoPrompt]).then(function(answer) {
      if (answer.sudo) {
        if (config.linux.packageManager === 'debian') {
          aptGet('update');
        } else {
          // other package manager commands
        }
      } else {
        log.warn('User aborted!');
      }
    });
  },
  installUpdates: function() {
    inquire.prompt([sudoPrompt]).then(function(answer) {
      if (config.linux.packageManager === 'debian') {
        aptGet('install');
      } else {
        // other package manager commands
      }
    });
  }
}