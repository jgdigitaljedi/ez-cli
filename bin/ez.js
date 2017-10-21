#! /usr/bin/env node
var yargs = require('yargs');
var copyMod = require('../modules/copy');
var info = require('../modules/info');
var sshMod = require('../modules/ssh');
var nodejs = require('../modules/node');
var speed = require('../modules/speedTest');
var linux = require('../modules/linux');
var init = require('../modules/init');
var installs = require('../modules/installs');
var configEx = require('../modules/configExposed');

var argv = yargs.usage('$0 command')
  .command('calendar', 'Print calendar to terminal', function() {
    return info.calendar();
  })
  .command('configView', 'View EZ-CLI config.', function() {
    return info.seeConfig();
  })
  .command('configTeach', 'Toggle teach mode.', function() {
    return configEx.toggleTeachMode();
  })
  .command('configZip', 'Change zipcode in config.', function() {
    return configEx.changeZipcode();
  })
  .command('driveSpace', 'See how much hard drive space you have.', function() {
    return info.hardDriveSpace();
  })
  .command('fileCopy', 'Copy a file somewhere.', function() {
    return copyMod.copyFile();
  })
  .command('folderCopy', 'Copy a folder somewhere.', function() {
    return copyMod.copyFolder();
  })
  .command('init', 'Gathers system info for EZ-CLI to work correctly.', function() {
    init.writeConfig();
  })
  .command('installCurl', 'Installs curl command line utility', function() {
    return installs.installCurl();
  })
  .command('linuxUpdates', 'Debian based Linux - get updates.', function() {
    linux.getUpdates();
  })
  .command('nodeKill', 'Kills node process.', function() {
    return nodejs.killNode();
  })
  .command('nodeVersion', 'Shows NodeJS version.', function() {
    return nodejs.nodeVersion();
  })
  .command('npmGlobalsList', 'List globally installed npm packages.', function() {
    return nodejs.listGlobalNpm();
  })
  .command('npmVersion', 'Shows npm version.', function() {
    return nodejs.npmVersion();
  })
  .command('ping', 'Pings an IP address or URL.', function() {
    return info.ping();
  })
  .command('printersList', 'Lists available printers.', function() {
    return info.listPrinters();
  })
  .command('processId', 'Gets PID(s) of process by name.', function() {
    return info.pidName();
  })
  .command('speedTest', 'Run a speedtest from the console.', function() {
    return speed.test();
  })
  .command('sshKeyClip', 'Copy ssh key to clipboard', function() {
    sshMod.copySshToClipboad();
  })
  .command('sshKeyView', 'Prints public ssh key to console.', function() {
    return sshMod.viewSshKey();
  })
  .command('whereAmI', 'Find path to current directory.', function() {
    return info.whereAmI();
  })
  .help('h')
  .alias('h', 'help')
  .argv;