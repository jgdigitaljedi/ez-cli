var clip = require('node-clip')();

module.exports = {
  setClipboard: function (content) {
    clip.write('clipboard', content, function (err, value) {
      if (err) {
        console.log('Error copying to clipboard. If on Linux, you need xclip installed and if on MacOS you need pbcopy installed.');
      } else {
        console.log('Copied ssh public key to clipboard. Paste it where you need it');
      }
    });
  }
};