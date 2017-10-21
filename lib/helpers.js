'use strict';

var log = require('../lib/log');
var exec = require('child_process').exec;

module.exports = {
  removeLineBreak: function(text) {
    return text.replace(/^\s+|\s+$/g, '');
  },
  puts: function (error, stdout, stderr) {
    if (!error) {
      log.general(stdout);
    } else {
      log.err(error);
    }
  },
  homeShort: function() {
    return new Promise((resolve, reject) => {
      exec('echo $HOME', function(err, stdout, stderr) {
        resolve(stdout);
      });
    });
  }
}