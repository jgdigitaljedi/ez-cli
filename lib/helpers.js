/*jslint node: true */
/*jslint esnext: true */
'use strict';

var exec = require('child_process').exec;
var log = require('../lib/log');

/** General helper functions commonly used in app
 * @module lib/helpers
 */
module.exports = {
	/**
	 * Removes a line break from the end of a string.
	 * @param {string} text - text from which line break needs to be removed
	 * @return {string} - text with line break removed
	 */
	removeLineBreak: function(text) {
		return text.replace(/^\s+|\s+$/g, '');
	},
	/**
	 * Takes output stream data and logs it appropriately.
	 * @param {error} error - stdout operation error data
	 * @param {string} stdout - text to be logged
	 * @param {string} stderr - possible error text to be logged if error exists
	 */
	puts: function(error, stdout, stderr) {
		if (!error) {
			log.general(stdout);
		} else {
			log.err(error);
		}
	},
	/**
	 * Returns promise containing text for home directory full path
	 * @return {Promise<string>} - Resolves to string with full path to home directory. 
	 */
	homeShort: function() {
		return new Promise((resolve, reject) => {
			exec('echo $HOME', function(err, stdout, stderr) {
				if (err) {
					reject(stderr);
				} else {
					resolve(stdout);
				}
			});
		});
	},
	/**
	 * Takes user entered input for answer to prompt and returns boolean to determine if yes or no was their choice.
	 * @param {string} answer - User input
	 */
	yesNo: function(answer) {
		return answer.toLowerCase().trim() === 'yes' || answer.toLowerCase().trim() === 'y';
	}
};
