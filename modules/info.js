var inquire = require('inquirer');
var files = require('../lib/files');
var finish = require('../lib/finalAnswer');

module.exports = {
  whereAmI: function() {
    // finish.show(files.getFullPath());
    files.getFullPath(true);
  }
}