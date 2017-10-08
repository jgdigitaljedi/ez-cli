var inquire = require('inquirer');
var files = require('../lib/files');
var finish = require('../lib/finalAnswer');
var shell = require('shelljs');

var whichPlatform = {
  name: 'platform',
  type: 'list',
  message: 'Which platform/OS are you using?',
  choices: ['Linux', 'MacOS', 'Windows'],
  default: 1
};

module.exports = {
  whereAmI: function() {
    // finish.show(files.getFullPath());
    files.getFullPath(true);
  },
  hardDriveSpace: function(platform) {
    inquire.prompt([whichPlatform]).then(function(answer) {
      switch(answer.platform) {
        case 'Linux':
        case 'MacOS':
          shell.exec('df');
          break;
        case 'Windows':
          shell.exec('fsutil volume diskfree c:');
          break;
      }
    });
  },
  calendar: function(platform) {
    inquire.prompt([whichPlatform]).then(function(answer) {
      if (answer.platform === 'Linux' || answer.platform === 'MacOS') {
        shell.exec('cal');
      } else {
        console.log('Sorry, Windows does not have this functionality by default.');
      }
    });
  }
};