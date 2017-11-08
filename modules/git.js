'use strict';

var inquire = require('inquirer');
var log = require('../lib/log');
var exec = require('child_process').exec;
var helpers = require('../lib/helpers');

module.exports = {
  gitStatus: function() {
    exec('git status', helpers.puts);
  },
  gitAdd: function() {

  },
  gitCommit: function() {

  },
  gitPush: function() {

  },
  gitAll: function() {

  },
  gitForget: function() {

  }
}