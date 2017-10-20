'use_strict';

var fs = require('fs');
var config = require('../system.config.json');
var sys = require('util')
var exec = require('child_process').exec;
var log = require('../lib/log');

function puts(error, stdout, stderr) {
  if (!error) {
    log.general(stdout);
  } else {
    log.err(error);
  }
}

module.exports = {
  sudoPrompt: {
    name: 'sudo',
    type: 'confirm',
    message: 'THIS COMMAND REQUIRES SUDO. YOU WILL BE PROMPTED FOR YOUR PASSWORD IF YOU PROCEED!',
    default: false
  },
  ping: function(where) {
    var command;
    if (config.unix || config.windows.gitBash) {
      command = 'ping -c 3 ' + where;
    } else {
      command = 'ping ' + where;
    }
    exec(command, puts);
    if (config.teachMode) {
      log.teach(command);
    }
  },
  pid: function(name) {
    exec('pidof ' + name, puts);
    if (config.teachMode) {
      log.teach('pidof ' + name);
    }
  },
  curl: function() {
    return exec('which curl');
  },
  wget: function() {
    return exec('which wget');
  }
};