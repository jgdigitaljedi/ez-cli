/*jslint node: true */
/*jslint esnext: true */
'use strict';

var exec = require('child_process').exec;
var helpers = require('../lib/helpers');
var inquire = require('inquirer');
var log = require('../lib/log');
var query = require('cli-interact').getYesNo;

/** Git specific methods callable by passing arguments in command line
 * @module modules/git
 */
module.exports = {
	/**
	 * Logs git status of current directory
	 */
	gitStatus: function() {
		exec('git status', helpers.puts);
	},
	/**
	 * Same as running 'git add -A'
	 */
	gitAdd: function() {
		exec('git add -A', helpers.puts);
	},
	/**
	 * Same as running 'git commit -m' and prompts user for message
	 */
	gitCommit: function() {
		return new Promise(function(resolve, reject) {
			inquire
				.prompt([
					{
						type: 'input',
						message: 'Please type a commit message and press enter.',
						name: 'comMess'
					}
				])
				.then(function(message) {
					exec('git commit -m ' + message, helpers.puts);
					resolve(true);
				});
		});
	},
	/**
	 * Same as running 'git push origin' and branch
	 */
	gitPush: function(branch) {
		exec('git push origin ' + branch);
	},
	gitAll: function() {
		var that = this;
		this.gitCurBranch(true).then(function(branch) {
			that.gitStatus();
			setTimeout(function() {
				var lookGood = query('If this looks good, press "enter" to continue...');
				that.gitAdd();
				setTimeout(function() {
					that.gitCommit().then(function() {
						that.gitPush(branch);
					});
				}, 500);
			}, 200);
		});
	},
	gitForget: function() {
		exec('git rm -r --cached .');
	},
	gitCurBranch: function(cb) {
		if (cb) {
			return new Promise(function(resolve, reject) {
				exec('git rev-parse --abbrev-ref HEAD', function(err, stdout, stderr) {
					if (err) {
						reject(err);
					} else {
						resolve(stdout);
					}
				});
			});
		} else {
			exec('git rev-parse --abbrev-ref HEAD', helpers.puts);
		}
	}
};
