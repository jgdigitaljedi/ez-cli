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
	/**
	 * Prompts user for zipcode to be inputted and changes saved zipcode in config
	 */
	changeZipcode: function() {
		inquire
			.prompt([
				{
					name: 'zip',
					type: 'input',
					message: 'Enter your zipcode.'
				}
			])
			.then(function(answer) {
				config.zipcode = answer.zip;
				var message = 'Zipcode changed to ' + answer.zip;
				configMethods.writeConfig(config, message);
			});
	},
	/**
	 * Toggles teach mode in config
	 */
	toggleTeachMode: function() {
		config.teachMode = !config.teachMode;
		var message = 'Teach mode is now ' + (config.teachMode ? 'on' : 'off');
		configMethods.writeConfig(config, message);
	},
	/**
	 * Logs config to console
	 */
	viewConfig: function() {
		var configStr = JSON.stringify(config, null, 4);
		log.general(configStr);
	}
};
