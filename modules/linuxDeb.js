var exec = require('child_process').exec;
var inquire = require('inquirer');

module.exports = {
  getUpdates: function() {
    inquire.prompt(
      [{
        name: 'sudo',
        type: 'confirm',
        message: 'THIS COMMAND REQUIRES SUDO. YOU WILL BE PROMPTED FOR YOUR PASSWORD IF YOU PROCEED!',
        default: false
      }]
    ).then(function(answer) {
      // @TODO: Make version check async, return version and package manager as object, all for future use in other methods
      if (answer.sudo) {
        exec('lsb_release -ds 2>/dev/null || cat /etc/*release 2>/dev/null | head -n1 || uname -om')
        .stdout.on('data', function(data) {
          console.log('version', data.toLowerCase());
          var version = data.toLowerCase();
          if (version.indexOf('ubuntu') >= 0 || version.indexOf('debian') >= 0) {
            exec('sudo apt-get update').stdout.on('data', function(data) {
              console.log(data);
            });
          }
        });
      } else {
        
      }
    });
  }
}