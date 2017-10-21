'use strict';

var log = require('../lib/log');

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
  }
}