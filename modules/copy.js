var inquire = require('inquirer');
var files = require('../lib/files');
var finish = require('../lib/finalAnswer');

module.exports = {
  copyFolder: function() {
    var questions = [
      {
        name: 'origin',
        type: 'list',
        message: 'Would like like to type relative or absolute paths?',
        choices: ['relative', 'absolute'],
        default: 0
      },
      {
        name: 'from',
        type: 'input',
        message: 'What is the path of the folder you wish to copy?',
        validate: function(value) {
          return files.directoryExists(value, 'relative');
        },
        when: function(answers) {
          return answers.origin === 'relative';
        }
      },
      {
        name: 'from',
        type: 'input',
        message: 'What is the path of the folder you wish to copy?',
        validate: function(value) {
          return files.directoryExists(value, 'absolute');
        },
        when: function(answers) {
          return answers.origin === 'absolute';
        }
      },
      {
        name: 'to',
        type: 'input',
        message: 'What is the path to which you would like to copy the folder?',
        validate: function (value) {
          return files.directoryExists(value, 'relative');
        },
        when: function(answers) {
          return answers.origin === 'relative';
        }
      },
      {
        name: 'to',
        type: 'input',
        message: 'What is the path to which you would like to copy the folder?',
        validate: function (value) {
          return files.directoryExists(value, 'absolute');
        },
        when: function(answers) {
          return answers.origin === 'absolute';
        }
      }
    ];
    
    inquire.prompt(questions).then(function(answers) {
      if (answers.origin === 'relative') {
        finish.yesNo('cp -r ' + answers.from + ' ' + answers.to);
      } else {
        finish.yesNo('cp -r ' + answers.from + ' ' + answers.to);
      }
    });
  }
};