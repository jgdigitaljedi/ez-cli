/*jslint node: true */
/*jslint esnext: true */
'use strict';

var config = '../system.config.json';
var exec = require('child_process').exec;
var helpers = require('../lib/helpers');
var inquire = require('inquirer');
var log = require('../lib/log');
var util = require('../lib/util');

function checkForInstall(which) {
	return new Promise(function(resolve, reject) {
		util[which]().then(function(err, stdout, stderr) {
			if (!err && stdout.indexOf('not found') === -1) {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	});
}

/** Software install methods callable by passing arguments in command line
 * @module modules/installs
 */
module.exports = {
	installNvm: function() {
		// you'd have to have node to use this tool in the first place, why did I write this?
		checkForInstall('curl').then(function(result) {
			if (result) {
				exec(
					'curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash',
					helpers.puts
				);
			} else {
				checkForInstall('wget').then(function(res) {
					if (res) {
						exec(
							'wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash',
							helpers.puts
						);
					} else {
						log.err('You have to have either curl or wget installed to do this!');
					}
				});
			}
		});
	},
	installCurl: function() {
		checkForInstall('curl').then(function(result) {
			if (result) {
				log.warn('You already have curl installed!');
				return;
			}
			if (config.platform === 'darwin') {
				exec('brew install curl').stdout
					.on('data', function(data) {
						log.general(helpers.removeLineBreak(data));
					})
					.on('exit', function() {
						if (config.teachMode) {
							log.teach('brew install curl');
						}
					});
			} else {
				if (config.linux.packageManager === 'apt') {
					inquire.prompt([ util.sudoPrompt ]).then(function(answer) {
						if (helpers.yesNo(answer.sudo)) {
							exec('sudo apt-get install curl').stdout
								.on('data', function(data) {
									log.general(helpers.removeLineBreak(data));
								})
								.on('exit', function() {
									if (config.teachMode) {
										log.teach('sudo apt-get install curl');
									}
								});
						} else {
							log.warn('User aborted!');
						}
					});
				}
			}
		});
	},
	installOhMyZsh: function() {
		inquire
			.prompt([
				{
					type: 'confirm',
					name: 'omz',
					message: 'You need to install zsh and set as default shell first. Proceed? (y/N)',
					default: false
				}
			])
			.then(function(answer) {
				if (helpers.yesNo(answer.omz)) {
					exec(
						'sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"'
					);
					if (config.teachMode) {
						log.teach(
							'sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"'
						);
					}
				}
			});
	},
	installZsh: function() {
		inquire.prompt([ util.sudoPrompt ]).then(function(answer) {
			if (helpers.yesNo(answer.sudo)) {
				if (config.platform === 'darwin') {
				} else if (config.linux.packageManager === 'apt') {
					exec('sudo apt-get install zsh').stdout
						.on('data', function(data) {
							log.general(helpers.removeLineBreak(data));
						})
						.on('exit', function() {
							if (config.teachMode) {
								log.teach('sudo apt-get install zsh');
							}
						});
				} else if (config.linux.packageManager === 'yum') {
				}
			} else {
				log.general('User aborted!');
			}
		});
	},
	installThefuck: function() {
		if (config.platform === 'darwin') {
			exec('brew install thefuck').stdout
				.on('data', function(data) {
					log.general(helpers.removeLineBreak(data));
				})
				.on('exit', function() {
					log.success('theFuck successfully installed!');
					if (config.teachMode) {
						log.teach('brew install theFuck');
					}
				});
		} else if (config.linux.packageManager === 'apt') {
			inquire.prompt([ util.sudoPrompt ]).then(function(answer) {
				if (helpers.yesNo(answer.sudo)) {
					exec('sudo apt install python3-dev python3-pip').on
						.stdout('data', function(data) {
							log.general(helpers.removeLineBreak(data));
						})
						.on('exit', function() {
							exec('sudo pip3 install thefuck').stdout
								.on(function(dat) {
									log.general(helpers.removeLineBreak(dat));
								})
								.on('exit', function() {
									log.success("Congrats! theFuck and it's dependencies have been installed!");
									if (config.teachMode) {
										log.teach('sudo apt install python3-dev python3-pip');
										log.teach('sudo pip3 install thefuck');
									}
								});
						});
				}
			});
		} else {
		}
	}
};
