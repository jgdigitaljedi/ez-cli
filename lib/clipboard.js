/*jslint node: true */
'use strict';

var clip = require('node-clip')();
var log = require('./log');

module.exports = {
	setClipboard: function(content, errMessage, succMessage) {
		clip.write('clipboard', content, function(err, value) {
			if (err) {
				log.err(errMessage);
			} else {
				log.success(succMessage);
			}
		});
	}
};
