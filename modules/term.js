/*jslint node: true */
'use strict';

var config = require('../system.config');
var exec = require('child_process').exec;
var fs = require('fs');
var helpers = require('../lib/helpers');
var inquire = require('inquirer');
var log = require('../lib/log');
var path = require('path');
var shell = path.join(path.dirname(fs.realpathSync(__filename)), '../shell');

/** Terminal related methods callable by passing arguments in command line
 * @module modules/term
 */
module.exports = {
	resource: function() {
		exec('sh ' + shell + '/source.sh' + ' ' + config.shell.config, function(err, stdout, stderr) {
			if (err) {
				log.err(err);
			} else {
				log.success('Shell environment updated/refreshed!');
				if (config.teachMode) {
					log.teach('source ' + config.shell.config);
				}
			}
		});
	},
	envVar: function() {
		inquire
			.prompt([
				{
					name: 'key',
					type: 'input',
					message: 'Enter name for new environment variable (using CAPS is preferred).',
					validate: function(value) {
						return value.length > 0;
					}
				},
				{
					name: 'val',
					type: 'input',
					message: 'Enter value for new variable.',
					validate: function(val) {
						return val.length > 0;
					}
				}
			])
			.then(function(answers) {
				exec('echo "export ' + answers.key + '=' + answers.val + '" >> ' + config.shell.config, function(
					err,
					stdout,
					stderr
				) {
					if (err) {
						log.err(err);
					} else {
						log.success(answers.key + ' added to environment config!');
						var paths = config.shell.config.split('/');
						var pLast = paths.length - 1;
						var cPath;
						if (paths[1] === 'home') {
							cPath = '~/' + paths[pLast];
						} else {
							cPath = config.shell.config;
						}
						log.general(
							'Either restart your terminal or run "source ' + cPath + '". I can\'t run that for you!'
						);
					}
				});
			});
	}
};
