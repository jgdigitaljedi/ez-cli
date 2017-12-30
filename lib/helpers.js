/*jslint node: true */
/*jslint esnext: true */
'use strict';

var exec = require('child_process').exec;
var log = require('../lib/log');

module.exports = {
	removeLineBreak: function(text) {
		return text.replace(/^\s+|\s+$/g, '');
	},
	puts: function(error, stdout, stderr, justConsole) {
		if (justConsole) {
			// here for testing purposes
			return console.log(stdout);
		}
		if (!error) {
			log.general(stdout);
		} else {
			log.err(error);
		}
	},
	homeShort: function() {
		return new Promise((resolve, reject) => {
			exec('echo $HOME', function(err, stdout, stderr) {
				resolve(stdout);
			});
		});
	},
	yesNo: function(answer) {
		return answer.toLowerCase().trim() === 'yes' || answer.toLowerCase().trim() === 'y';
	}
};
