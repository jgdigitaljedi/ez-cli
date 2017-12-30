/*jslint node: true */
'use strict';

var chalk = require('chalk');
var config = require('../system.config');
var configMethods = require('../lib/configMethods');
var exec = require('child_process').exec;
var files = require('../lib/files');
var helpers = require('../lib/helpers');
var inquire = require('inquirer');
var log = require('../lib/log');
var os = require('os');

function deb(version) {
	return version.indexOf('ubuntu') >= 0 || version.indexOf('debian') >= 0;
}

function yum(version) {
	return (
		version.index('fedora') >= 0 ||
		version.indexOf('centos') >= 0 ||
		version.indexOf('hat') >= 0 ||
		version.indexOf('scientific') >= 0
	);
}

function termType() {
	inquire
		.prompt([
			{
				type: 'input',
				name: 'ttype',
				message: 'What type of shell are you using (bash, zsh, fish, ksh, etc)?',
				validate: function(val) {
					return val.length > 0;
				}
			},
			{
				type: 'input',
				name: 'tconfig',
				message: 'What is the path to your terminal config (~/.zshrc, ~/.bashrc, etc)?',
				validate: function(value) {
					return new Promise(function(resolve, reject) {
						if (value.indexOf('~') === 0) {
							files.fileExists(value).then(function(result) {
								var exists;
								if (result.hasOwnProperty('fullHome')) {
									console.log('hellyeah', result.fullHome);
									exists = true;
								} else {
									exists = false;
								}
								console.log('exists', exists);
								resolve(exists);
							});
						} else {
							var ex = files.fileExists(value);
							resolve(ex ? true : false);
						}
					});
				}
			}
		])
		.then(function(answers) {
			if (!config.hasOwnProperty('shell')) {
				config.shell = {};
			}
			config.shell.type = answers.ttype;
			config.shell.config = answers.tconfig;

			if (config.shell.config.trim().indexOf('~') === 0) {
				// I hate that I'm doing this again, but will circle back and find a more elegan solution
				helpers.homeShort().then(function(home) {
					config.shell.config = helpers.removeLineBreak(home) + config.shell.config.slice(1);
					configMethods.writeConfig(config);
				});
			} else {
				configMethods.writeConfig(config);
			}
			log.success('Success! Your config is written!');
		});
}

function linuxCheck(plat) {
	return new Promise((resolve, reject) => {
		if (plat === 'linux' || plat === 'freebsd') {
			exec(
				'lsb_release -ds 2>/dev/null || cat /etc/*release 2>/dev/null | head -n1 || uname -om'
			).stdout.on('data', function(data) {
				var version = data.toLowerCase().replace(/^\s+|\s+$/g, '');
				config.linux.version = version;
				if (deb(version)) {
					config.linux.packageManager = 'apt';
				} else if (yum(version)) {
					config.linux.packageManager = 'yum';
				}
				resolve(true);
			});
		} else {
			resolve(true);
		}
	});
}

module.exports = {
	writeConfig: function() {
		// platform
		var plat = os.platform();
		config.platform = plat;

		// unix
		config.unix = plat === 'linux' || plat === 'darwin' || plat === 'freebsd';

		// linux version and packageManager
		linuxCheck(plat).then(function(result) {
			inquire
				.prompt([
					{
						// zipcode
						name: 'zip',
						type: 'input',
						message: 'What is your zipcode (for weather info)?'
					},
					{
						// teachMode
						name: 'teach',
						type: 'input',
						message:
							"Teach Mode echo's the commands that are run in an effort to help teach you terminal commands. Would you like to enable Teach Mode? (y/N)",
						default: false
					},
					{
						// windows git-bash
						name: 'windblows',
						type: 'list',
						message: 'Are you using Git-Bash (or CygWin or something similar) OR regular Windows CMD.exe?',
						choices: [ 'Git-Bash', 'CMD.exe' ],
						default: 0,
						when: function(currAnswers) {
							return plat === 'win32';
						}
					}
				])
				.then(function(answers) {
					config.zipcode = answers.zip;
					config.teachMode = answers.teach.toLowerCase() === 'y' || answers.teach.toLowerCase() === 'yes';
					if (plat === 'win32') {
						config.windows.gitBash = answers.windblows === 0;
					}
					termType();
				});
		});
	}
};
