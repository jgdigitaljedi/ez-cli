'use strict';

var log = require('../lib/log');
var util = require('../lib/util');
var config = require('../system.config');
var configMethods = require('../lib/configMethods');
var inquire = require('inquirer');

module.exports = {
  changeZipcode: function() {
    inquire.prompt([{
      name: 'zip',
      type: 'input',
      message: 'Enter you zipcode.'
    }]).then(function(answer) {
      config.zipcode = answer.zip;
      var message = 'Zipcode changed to ' + answer.zip;
      configMethods.writeConfig(config, message);
    });
  },
  toggleTeachMode: function() {
    config.teachMode = !config.teachMode;
    var message = 'Teach mode is now ' + (config.teachMode ? 'on' : 'off');
    configMethods.writeConfig(config, message);
  }
};