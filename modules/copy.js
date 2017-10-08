var inquire = require('inquirer');
var files = require('../lib/files');
var finish = require('../lib/finalAnswer');
var libInfo = require('../lib/libInfo');

module.exports = {
  copyFolder: function() {
    var questions = [
      {
        name: 'from',
        type: 'input',
        message: 'What is the path of the folder you wish to copy?',
        validate: function(value) {
          return files.directoryExists(value);
        }
      },
      {
        name: 'to',
        type: 'input',
        message: 'What is the path to which you would like to copy the folder?',
        validate: function(value) {
          return files.directoryExists(value);
        }
      }
    ];
    
    inquire.prompt(questions).then(function(answers) {
      var unixBased = libInfo.unixOs();
      if (unixBased) {
        finish.yesNoExec('cp -r ' + answers.from + ' ' + answers.to);
      } else {
        inquire.prompt(libInfo.windowsTerminal()).then(function(term) {
          if (term.terminal === 'git-bash') {
            finish.yesNoExec('cp -r ' + answers.from + ' ' + answers.to);
          } else {
            finish.yesNoExec('xcopy ' + answers.from + '\* ' + answers.to + '\\' + answers.to + '/e /i');
          }
        });
      }
    });
  },
  copyFile: function() {
    var questions = [
      {
        name: 'file',
        type: 'input',
        message: 'What is the path to the file you wish to copy?',
        validate: function(value) {
          var exists = files.fileExists(value);
          return exists ? true : false;
        }
      },
      {
        name: 'destination',
        type: 'input',
        message: 'What is the path to which you would like to copy the folder?',
        validate: function(value) {
          return files.directoryExists(value);
        }
      }
    ];

    inquire.prompt(questions).then(function(answers) {
      var unixBased = libInfo.unixOs();
      if (unixBased) {
        finish.yesNoExec('cp ' + answers.file + ' ' + answers.destination);
      } else {
        inquire.prompt(libInfo.windowsTerminal()).then(function(term) {
          if (term.terminal === 'git-bash') {
            finish.yesNoExec('copy ' + answers.file + ' ' + answers.destination);
          } else {
            finish.yesNoExec('xcopy ' + answers.from + '\* ' + answers.to + '\\' + answers.to + '/e /i');
          }
        });
      }
    });
  }
};