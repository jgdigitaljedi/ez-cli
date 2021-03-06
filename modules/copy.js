/*jslint node: true */
'use strict';

var config = require('../system.config');
var files = require('../lib/files');
var finish = require('../lib/finalAnswer');
var inquire = require('inquirer');

/** File and directory copyinging methods callable by passing arguments in command line
 * @module modules/copy
 */
module.exports = {
	/**
	 * Prompts user for directory to copy and where to copy it then recursively copies directory
	 */
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
			var unixBased = config.unix || config.windows.gitBash;
			if (unixBased) {
				finish.yesNoExec('cp -r ' + answers.from + ' ' + answers.to);
			} else {
				finish.yesNoExec('xcopy ' + answers.from + '* ' + answers.to + '\\' + answers.to + '/e /i');
			}
		});
	},
	/**
	 * Prompts user for file to copy and where to copy it then copies it
	 */
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
			var unixBased = config.unix || config.windows.gitBash;
			if (unixBased) {
				finish.yesNoExec('cp ' + answers.file + ' ' + answers.destination);
			} else {
				finish.yesNoExec('xcopy ' + answers.from + '* ' + answers.to + '\\' + answers.to + '/e /i');
			}
		});
	}
};
