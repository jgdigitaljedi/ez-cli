var fs = require('fs');
var path = require('path');
var shell = require('shelljs');
var libInfo = require('../lib/libInfo');

module.exports = {
  getCurrentDirectoryBase : function() {
    return path.basename(process.cwd());
  },

  getFullPath: function(echo) {
    var unixOs = libInfo.unixOs();
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
    try {
      return fs.statSync(filePath);
    } catch (e) {
      return false;
    }
  }
};