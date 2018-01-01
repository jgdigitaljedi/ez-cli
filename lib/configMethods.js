/*jslint node: true */
'use_strict';

var configPath = '/../system.config.json';
var fs = require('fs');
var log = require('./log');
var path = require('path');

/** Helper functions for configuration related tasks
 * @module lib/configMethods
 */
module.exports = {
	/**
	 * Writes config to system.config.json
	 * 
	 * @param {object} newConfig - JSON object containing configuration
	 * @param {string} extra - optional message to be logged after config is written
	 */
	writeConfig: function(newConfig, extra) {
		var configStr = JSON.stringify(newConfig, null, 4);
		return new Promise((resolve, reject) => {
			fs.writeFile(__dirname + configPath, configStr, function(err, data) {
				if (err) {
					log.err('error writing platform to config: ', err);
					reject(err);
				} else {
					log.success('Config successfully changed!!');
					resolve(newConfig);
					if (extra) {
						log.general(extra);
					}
				}
			});
		});
	}
};
