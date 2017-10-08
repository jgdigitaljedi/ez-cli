var inquire = require('inquirer');
var files = require('../lib/files');
var finish = require('../lib/finalAnswer');

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
        validate: function (value) {
          return files.directoryExists(value);
        }
      }
    ];
    
    inquire.prompt(questions).then(function(answers) {
      finish.yesNoExec('cp -r ' + answers.from + ' ' + answers.to);
    });
  }
};