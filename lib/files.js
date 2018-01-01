/*jslint node: true */
'use strict';

var config = require('../system.config');
var fs = require('fs');
var helpers = require('./helpers');
var path = require('path');
var shell = require('shelljs');

function fileEx(fp) {
	try {
		return fs.statSync(fp);
	} catch (e) {
		return false;
	}
}

/** Helper functions for file related tasks
 * @module lib/files
 */
module.exports = {
	/**
	 * returns current working directory
	 * @returns {string} - current working directory
	 */
	getCurrentDirectoryBase: function() {
		return path.basename(process.cwd());
	},
	/**
	 * Returns or logs full path depending on optional param
	 * @param {string} echo - determines if full path logged or returned
	 * @returns {string} - full path
	 */
	getFullPath: function(echo) {
		var unixOs = config.unix || config.windows.gitBash;
		if (echo) {
			if (unixOs) {
				shell.exec('echo $PWD');
			} else {
				shell.exec('cd');
			}
		} else {
			return path.resolve(require.main.filename);
		}
	},
	/**
	 * Checks to see if a directory exists
	 * @param {string} filePath - path of directory to be checked
	 */
	directoryExists: function(filePath) {
		try {
			return fs.statSync(filePath).isDirectory();
		} catch (err) {
			return false;
		}
	},
	/**
	 * Checks to see if a file exists
	 * @param {string} filePath - path of file to be checked
	 */
	fileExists: function(filePath) {
		if (filePath.trim().indexOf('~') === 0) {
			return helpers.homeShort().then(function(result) {
				filePath = helpers.removeLineBreak(result) + filePath.slice(1);
				return { fp: fileEx(filePath), fullHome: filePath };
			});
		} else {
			return fileEx(filePath);
		}
	}
};
