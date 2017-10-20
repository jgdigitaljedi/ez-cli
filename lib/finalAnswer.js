'use strict';

var inquire = require('inquirer');
var shell = require('shelljs');
var config = require('../system.config');
var log = require('./log');

module.exports = {
  yesNoExec: function(task) {
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
        if (config.teachMode) {
          log.teach(task);
        }
      } else {
        log.warn('User aborted!');
      }
    });
  },
  show: function(text) {
    log.general(text);
  }
};