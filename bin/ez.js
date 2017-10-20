#! /usr/bin/env node
var yargs = require('yargs');
var copyMod = require('../modules/copy');
var info = require('../modules/info');
var sshMod = require('../modules/ssh');
var nodejs = require('../modules/node');
var speed = require('../modules/speedTest');
var deb = require('../modules/linuxDeb');
var init = require('../modules/init');

var argv = yargs.usage('$0 command')
  .command('calendar', 'Print calendar to terminal', function() {
    return info.calendar();
  })
  .command('configView', 'View EZ-CLI config.', function() {
    return info.seeConfig();
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
    return init.writeConfig();
  })
  .command('linuxUpdates', 'Debian based Linux - get updates.', function() {
    deb.getUpdates();
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
  .command('printersList', 'Lists available printers.', function() {
    return info.listPrinters();
  })
  .command('speedTest', 'Run a speedtest from the console.', function() {
    return speed.test();
  })
  .command('sshKeyCopy', 'Copy ssh key to clipboard', function() {
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