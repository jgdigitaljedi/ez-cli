/*jslint node: true */
'use strict';

var chalk = require('chalk');

/** Helper functions for different styled console logs
 * @module lib/log
 */
module.exports = {
	teach: function(what) {
		console.log(chalk.magenta('Ran: ', chalk.white.bgMagenta.bold(what)));
	},
	success: function(what) {
		console.log(chalk.green(what));
	},
	warn: function(what) {
		console.log(chalk.yellow(what));
	},
	err: function(what) {
		console.log(chalk.red(what));
	},
	general: function(what) {
		console.log(chalk.cyan(what));
	}
};
