'use strict';

var config = '../system.config.json';
var util = require('../lib/util');
var exec = require('child_process').exec;
var log = require('../lib/log');
var inquire = require('inquirer');

function puts(error, stdout, stderr) {
  if (!error) {
    log.general(stdout);
  } else {
    log.err(error);
  }
}

function checkForInstall(which) {
  return new Promise(function(resolve, reject) {
    util[which]().then(function(err, stdout, stderr) {
      if (!err && stdout.indexOf('not found') === -1) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

module.exports = {
  // installNvm: function() { // you'd have to have node to use this tool in the first place, why did I write this?
  //   checkForInstall('curl').then(function(result) {
  //     if (result) {
  //       exec('curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash', puts);
  //     } else {
  //       checkForInstall('wget').then(function(res) {
  //         if (res) {
  //           exec('wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash', puts);
  //         } else {
  //           log.err('You have to have either curl or wget installed to do this!');
  //         }
  //       });
  //     }
  //   });
  // },
  installCurl: function() {
    checkForInstall('curl').then(function(result) {
      if (result) {
        log.warn('You already have curl installed!');
        return;
      }
      if (config.platform === 'darwin') {
        exec('brew install curl', puts);
        if (config.teachMode) {
          log.teach('brew install curl');
        }
      } else {
        if (config.linux.packageManager === 'debian') {
          inquire.prompt([util.sudoPrompt]).then(function(answer) {
            var lCase = answer.sudo.toLowerCase();
            if (lCase === 'y' || lCase == 'yes') {
              exec('sudo apt-get install curl', puts);
            } else {
              log.warn('User aborted!');
            }
          });
        }
      }
    });
  }
};