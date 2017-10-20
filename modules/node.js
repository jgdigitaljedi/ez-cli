'use strict';

var exec = require('child_process').exec;
var log = require('../lib/log');

module.exports = {
  listGlobalNpm: function() {
    exec('npm list -g', function(err, stdout, stderr) {
      console.log(stdout);
    });
  },
  killNode: function() {
    exec('killall node', function(err, stdout, stderr) {
      if (err) {
        log.err('May not have stopped Node. Try running "killall node"');
      }
    });
  }
};