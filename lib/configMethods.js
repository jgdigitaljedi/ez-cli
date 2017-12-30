/*jslint node: true */
'use_strict';

var path = require('path');
var fs = require('fs');
var configPath = '/../system.config.json';
var log = require('./log');

module.exports = {
	writeConfig: function(newConfig, extra) {
		var configStr = JSON.stringify(newConfig, null, 4);
		fs.writeFile(__dirname + configPath, configStr, function(err, data) {
			if (err) {
				log.err('error writing platform to config: ', err);
			} else {
				log.success('Config successfully changed!!');
				if (extra) {
					log.general(extra);
				}
			}
		});
	}
};
