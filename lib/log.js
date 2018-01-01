/*jslint node: true */
'use strict';

var chalk = require('chalk');

/** Helper functions for different styled console logs
 * @module lib/log
 */
module.exports = {
	/**
	 * Logs bold magenta text with a white background
	 * @param {string} what - text to be logged
	 */
	teach: function(what) {
		console.log(chalk.magenta('Ran: ', chalk.white.bgMagenta.bold(what)));
	},
	/**
	 * Logs green text
	 * @param {string} what - text to be logged
	 */
	success: function(what) {
		console.log(chalk.green(what));
	},
	/**
	 * Logs yellow text
	 * @param {string} what - text to be logged
	 */
	warn: function(what) {
		console.log(chalk.yellow(what));
	},
	/**
	 * Logs red text
	 * @param {string} what - text to be logged
	 */
	err: function(what) {
		console.log(chalk.red(what));
	},
	/**
	 * Logs cyan text
	 * @param {string} what - text to be logged
	 */
	general: function(what) {
		console.log(chalk.cyan(what));
	}
};
