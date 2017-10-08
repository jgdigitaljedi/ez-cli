var os = require('os');

module.exports = {
  currentPlatform: function() {
    return os.platform();
  },
  unixOs: function() {
    var currPlatform = this.currentPlatform()
    return (currPlatform === 'linux' || currPlatform === 'darwin' || currPlatform === 'freebsd');
  },
  windowsTerminal: function() {
    return [{
      name: 'terminal',
      message: 'Are you using git-bash or Windows CMD?',
      type: 'list',
      choices: ['git-bash', 'Windows CMD'],
      default: 0
    }];
  }
};