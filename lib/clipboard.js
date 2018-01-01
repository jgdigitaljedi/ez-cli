/*jslint node: true */
'use strict';

var clip = require('node-clip')();
var log = require('./log');

/** Helper functions for clipboard related tasks
 * @module lib/clipboard
 */
module.exports = {
	/**
	 * Takes content, error text, and success text then tries to set clipboard with content and logs result.
	 * 
	 * @param {string} content - desired clipboard content
	 * @param {string} errMessage - message to log if error encountered
	 * @param {string} succMessage - message to log if successful 
	 */
	setClipboard: function(content, errMessage, succMessage) {
		clip.write('clipboard', content, function(err, value) {
			if (err) {
				log.err(errMessage);
			} else {
				log.success(succMessage);
			}
		});
	}
};
