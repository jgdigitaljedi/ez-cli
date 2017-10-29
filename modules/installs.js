'use strict';

var config = '../system.config.json';
var util = require('../lib/util');
var exec = require('child_process').exec;
var log = require('../lib/log');
var inquire = require('inquirer');
var helpers = require('../lib/helpers');

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
        exec('brew install curl').stdout.on('data', function(data) {
          log.general(helpers.removeLineBreak(data));
        }).on('exit', function() {
          if (config.teachMode) {
            log.teach('brew install curl');
          }
        });
      } else {
        if (config.linux.packageManager === 'apt') {
          inquire.prompt([util.sudoPrompt]).then(function(answer) {
            var lCase = answer.sudo.toLowerCase();
            if (lCase === 'y' || lCase == 'yes') {
              exec('sudo apt-get install curl').stdout.on('data', function(data) {
                log.general(helpers.removeLineBreak(data));
              }).on('exit', function() {
                if (config.teachMode) {
                  log.teach('sudo apt-get install curl');
                }
              });
            } else {
              log.warn('User aborted!');
            }
          });
        }
      }
    });
  },
  installOhMyZsh: function() {
    inquire.prompt([
      {
        type: 'confirm',
        name: 'omz',
        message: 'You need to install zsh and set as default shell first. Proceed? (y/N)',
        default: false
      }
    ]).then(function(answer) {
      if (answer.omz) {
        exec('sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"');
        if (config.teachMode) {
          log.teach('sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"');
        }
      }
    });
  },
  installZsh: function() {
    
  }
};