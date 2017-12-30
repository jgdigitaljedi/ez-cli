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

module.exports = {
	getCurrentDirectoryBase: function() {
		return path.basename(process.cwd());
	},
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
	directoryExists: function(filePath) {
		try {
			return fs.statSync(filePath).isDirectory();
		} catch (err) {
			return false;
		}
	},
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
