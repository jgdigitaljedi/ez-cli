var inquire = require('inquirer');
var shell = require('shelljs');

module.exports = {
  yesNo: function(task) {
    var question = [
      {
        name: 'yesNo',
        type: 'confim',
        message: 'Would you like to execute "' + task + "?: (y/N)",
        default: false
      }
    ]
    inquire.prompt(question).then(function (answer) {
      if (answer.yesNo.toLowerCase() === 'y' || answer.yesNo.toLowerCase() === 'yes') {
        shell.exec(task);
      }
    });
  },
  show: function(text) {
    console.log(text);
  }
};