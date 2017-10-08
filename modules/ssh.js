var shell = require('shelljs');
var libInfo = require('../lib/libInfo');
var inquire = require('inquirer');

module.exports = {
  copySshKeyToClipboad: function() {
    // still trying to figure this out
    // var platform = libInfo.currentPlatform();
    // if (platform === 'darwin') {
    //   shell.exec('pbcopy < ~/.ssh/id_rsa.pub');
    // } else if (platform === 'linux' || platform === 'freebsd') {
    //   var key = shell.cat('~/.ssh/id_rsa.pub').stdout;
    //   shell.exec('echo -n "' + key + '" | /usr/bin/xclip -selection clipboard');
    // } else {
    //   inquire.prompt(libInfo.windowsTerminal()).then(function(answer) {
    //     if (answer.terminal === 'git-bash') {
    //       shell.exec('cat ~/.ssh/id_rsa.pub > /dev/clipboard');
    //     } else {
    //       console.log('You\'re out of luck then. Not sure how to do this from Windows CMD.');
    //     }
    //   });
    // }
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
