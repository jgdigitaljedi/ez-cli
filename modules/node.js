var exec = require('child_process').exec;

module.exports = {
  listGlobalNpm: function() {
    exec('npm list -g', function(err, stdout, stderr) {
      console.log(stdout);
    });
  },
  killNode: function() {
    exec('killall node', function(err, stdout, stderr) {
      if (err) {
        console.log('May not have stopped Node. Try running "killall node"');
      }
    });
  }
};