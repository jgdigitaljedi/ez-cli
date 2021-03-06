/*jslint node: true */
/*jslint esnext: true */
'use strict';

var config = require('../system.config');
var exec = require('child_process').exec;
var helpers = require('../lib/helpers');
var inquire = require('inquirer');
var log = require('../lib/log');
var util = require('../lib/util');

function execCommand(command, event) {
	return new Promise((resolve, reject) => {
		exec(command).stdout.on(event, function(result) {
			resolve(result);
		});
	});
}

function aptGet(command) {
	exec('sudo apt-get ' + command).stdout
		.on('data', function(data) {
			log.general(helpers.removeLineBreak(data));
		})
		.on('exit', function() {
			if (config.teachMode) {
				log.teach('sudo apt-get ' + command);
			}
		});
}

function yum(command) {
	exec('sudo yum ' + command).stdout
		.on('data', function(data) {
			log.general(helpers.removeLineBreak(data));
		})
		.on('exit', function() {
			if (config.teachMode) {
				log.teach('sudo yum ' + command);
			}
		});
}

/** Linux specific methods callable by passing arguments in command line
 * @module modules/linux
 */
module.exports = {
	getUpdates: function() {
		inquire.prompt([ util.sudoPrompt ]).then(function(answer) {
			if (answer.sudo) {
				if (config.linux.packageManager === 'apt') {
					aptGet('update');
				} else if (config.linux.packageManager === 'yum') {
					yum('check-update');
				} else {
					// other package manager commands
				}
			} else {
				log.warn('User aborted!');
			}
		});
	},
	installUpdates: function() {
		inquire.prompt([ sudoPrompt ]).then(function(answer) {
			if (config.linux.packageManager === 'apt') {
				aptGet('install');
			} else {
				// other package manager commands
			}
		});
	}
};
