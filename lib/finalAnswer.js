/*jslint node: true */
'use strict';

var config = require('../system.config');
var inquire = require('inquirer');
var log = require('./log');
var shell = require('shelljs');

/** Helper functions for prompts/inquirer related tasks
 * @module lib/finalAnswer
 */
module.exports = {
	/**
	 * Uses npm module inquirer to ask a generic yes or no confirmation to user
	 * @param {string} task - text for task in confirmation message
	 */
	yesNoExec: function(task) {
		var question = [
			{
				name: 'yesNo',
				type: 'confim',
				message: 'Would you like to execute "' + task + '?: (y/N)',
				default: false
			}
		];
		inquire.prompt(question).then(function(answer) {
			if (answer.yesNo.toLowerCase() === 'y' || answer.yesNo.toLowerCase() === 'yes') {
				shell.exec(task);
				if (config.teachMode) {
					log.teach(task);
				}
			} else {
				log.warn('User aborted!');
			}
		});
	}
};
