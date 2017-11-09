'use strict';

var inquire = require('inquirer');
var log = require('../lib/log');
var exec = require('child_process').exec;
var helpers = require('../lib/helpers');
var query = require('cli-interact').getYesNo;

module.exports = {
  gitStatus: function() {
    exec('git status', helpers.puts);
  },
  gitAdd: function() {
    exec('git add -A', helpers.puts);
  },
  gitCommit: function() {
    return new Promise(function(resolve, reject) {
      inquire.prompt([
        {
          type: 'input',
          message: 'Please type a commit message and press enter.',
          name: 'comMess'
        }
      ]).then(function(message) {
        exec('git commit -m ' + message, helpers.puts);
        resolve(true);
      });
    })
  },
  gitPush: function(branch) {
    exec('git push origin ' + branch);
  },
  gitAll: function() {
    var that = this;
    this.gitCurBranch(true).then(function(branch) {
      that.gitStatus();
      setTimeout(function() {
        var lookGood = query('If this looks good, press "enter" to continue...');
        that.gitAdd();
        setTimeout(function() {
          that.gitCommit().then(function() {
            that.gitPush(branch);
          });
        }, 500);
      }, 200);
    });
  },
  gitForget: function() {
    exec('git rm -r --cached .');
  },
  gitCurBranch: function(cb) {
    if (cb) {
      return new Promise(function(resolve, reject) {
        exec('git rev-parse --abbrev-ref HEAD', function(err, stdout, stderr) {
          if (err) {
            reject(err);
          } else {
            resolve(stdout);
          }
        });
      });
    } else {
      exec('git rev-parse --abbrev-ref HEAD', helpers.puts);
    }
  }
}