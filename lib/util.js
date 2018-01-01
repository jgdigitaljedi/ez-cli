/*jslint node: true */
'use_strict';

var fs = require('fs');
var config = require('../system.config.json');
var sys = require('util');
var exec = require('child_process').exec;
var log = require('./log');
var helpers = require('./helpers');

/** Helper functions for system utility related tasks
 * @module lib/util
 */
module.exports = {
	sudoPrompt: {
		name: 'sudo',
		type: 'confirm',
		message: 'THIS COMMAND REQUIRES SUDO. YOU WILL BE PROMPTED FOR YOUR PASSWORD IF YOU PROCEED!',
		default: false
	},
	/**
	 * Runs system ping command
	 * @param {string} where - target of ping
	 */
	ping: function(where) {
		var command;
		if (config.unix || config.windows.gitBash) {
			command = 'ping -c 3 ' + where;
		} else {
			command = 'ping ' + where;
		}
		exec(command, helpers.puts);
		if (config.teachMode) {
			log.teach(command);
		}
	},
	/**
	 * Logs process ID of given process name
	 * @param {string} name - process for which to log PID
	 */
	pid: function(name) {
		exec('pidof ' + name, helpers.puts);
		if (config.teachMode) {
			log.teach('pidof ' + name);
		}
	},
	/**
	 * Logs curl path (good for determining if curl command available)
	 * @returns {string} - curl path
	 */
	curl: function() {
		return exec('which curl');
	},
	/**
	 * Logs wget path (good for determining if wget command is available)
	 * @returns {string} - wget path
	 */
	wget: function() {
		return exec('which wget');
	}
};
