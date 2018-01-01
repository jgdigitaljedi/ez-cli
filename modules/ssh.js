/*jslint node: true */
'use strict';

var cb = require('../lib/clipboard');
var config = require('../system.config');
var inquire = require('inquirer');
var log = require('../lib/log');
var shell = require('shelljs');

/** Ssh related methods callable by passing arguments in command line
 * @module modules/ssh
 */
module.exports = {
	copySshToClipboad: function() {
		if (config.unix || config.windows.gitBash) {
			var key = shell.cat('~/.ssh/id_rsa.pub').stdout;
			cb.setClipboard(
				key,
				'Error copying to clipboard. If on Linux, you need xclip installed and if on MacOS you need pbcopy installed.',
				'Copied ssh public key to clipboard. Paste it where you need it'
			);
		} else {
			log.warn('Not sure how to this in Windows yet. Sorry.');
		}
	},
	copySshKeyToServer: function() {},
	viewSshKey: function() {
		var unixOs = config.unix || config.windows.gitBash;
		if (unixOs) {
			var key = shell.cat('~/.ssh/id_rsa.pub').stdout;
			log.general(key);
		} else {
			log.warn("You're out of luck then. Not sure how to do this from Windows CMD.");
		}
	}
};
