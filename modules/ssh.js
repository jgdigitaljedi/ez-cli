var shell = require('shelljs');
var libInfo = require('../lib/libInfo');
var inquire = require('inquirer');
var cb = require('../lib/clipboard');

module.exports = {
  copySshToClipboad: function() {
    if (libInfo.unixOs) {
      var key = shell.cat('~/.ssh/id_rsa.pub').stdout;
      cb.setClipboard(key);
    } else {
      console.log('Not sure how to this in Windows yet. Sorry.');
    }
  },
  copySshKeyToServer: function() {

  },
  viewSshKey: function() {
    var unixOs = libInfo.unixOs();
    if (unixOs) {
      var key = shell.cat('~/.ssh/id_rsa.pub').stdout;
      console.log(key);
    } else {
      inquire.prompt(libInfo.windowsTerminal()).then(function(answer) {
        if (answer.terminal === 'git-bash') {
          var key = shell.cat('~/.ssh/id_rsa.pub').stdout;
          console.log(key);
        } else {
          console.log('You\'re out of luck then. Not sure how to do this from Windows CMD.');
        }
      });
    }
  }
};
