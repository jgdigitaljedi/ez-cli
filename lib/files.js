var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

module.exports = {
  getCurrentDirectoryBase : function() {
    return path.basename(process.cwd());
  },

  getFullPath: function(echo) {
    if (echo) {
      shell.exec('echo $PWD');
    } else {
      return path.resolve(require.main.filename);
    }
  },

  directoryExists: function(filePath, type) {
    if (type === 'relative') {
      try {
        return fs.statSync(filePath).isDirectory();
      } catch (err) {
        return false;
      }
    } else {
      return fs.existsSync(filePath);
    }
  }
};