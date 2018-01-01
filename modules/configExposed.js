/*jslint node: true */
'use strict';

var config = require('../system.config');
var configMethods = require('../lib/configMethods');
var inquire = require('inquirer');
var log = require('../lib/log');
var util = require('../lib/util');

/** Configuration related methods callable by passing arguments in command line
 * @module modules/configExposed
 */
module.exports = {
	changeZipcode: function() {
		inquire
			.prompt([
				{
					name: 'zip',
					type: 'input',
					message: 'Enter you zipcode.'
				}
			])
			.then(function(answer) {
				config.zipcode = answer.zip;
				var message = 'Zipcode changed to ' + answer.zip;
				configMethods.writeConfig(config, message);
			});
	},
	toggleTeachMode: function() {
		config.teachMode = !config.teachMode;
		var message = 'Teach mode is now ' + (config.teachMode ? 'on' : 'off');
		configMethods.writeConfig(config, message);
	},
	viewConfig: function() {
		var configStr = JSON.stringify(config, null, 4);
		log.general(configStr);
	}
};
