var exec = require('child_process').exec;

module.exports = {
  listGlobalNpm: function () {
    exec('npm list -g', function (err, stdout, stderr) {
      console.log(stdout);
    });
  }
};