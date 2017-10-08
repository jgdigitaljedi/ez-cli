var os = require('os');

module.exports = {
  currentPlatform: function() {
    return os.platform();
  },
  unixOs: function() {
    var currPlatform = this.currentPlatform()
    return (currPlatform === 'linux' || currPlatform === 'darwin' || currPlatform === 'freebsd');
  }
};