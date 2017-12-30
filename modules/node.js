/*jslint node: true */
'use strict';

var exec = require('child_process').exec;
var log = require('../lib/log');
var config = require('../system.config');

module.exports = {
	listGlobalNpm: function() {
		exec('npm list -g', function(err, stdout, stderr) {
			if (!err) {
				console.log(stdout); // don't use log, just streaming output
			} else {
				log.err(err);
			}
			if (config.teachMode) {
				log.teach('npm list -g');
			}
		});
	},
	killNode: function() {
		exec('killall node', function(err, stdout, stderr) {
			if (err) {
				log.err('May not have stopped Node. Try running "killall node"');
			}
			if (config.teachMode) {
				log.teach('killall node');
			}
		});
	},
	nodeVersion: function() {
		exec('node -v', function(err, stdout, stderr) {
			if (!err) {
				log.general(stdout);
			} else {
				log.err(err);
			}
			if (config.teachMode) {
				log.teach('node -v');
			}
		});
	},
	npmVersion: function() {
		exec('npm -v', function(err, stdout, stderr) {
			if (!err) {
				log.general(stdout);
			} else {
				log.err(err);
			}
			if (config.teachMode) {
				log.teach('npm -v');
			}
		});
	}
};
