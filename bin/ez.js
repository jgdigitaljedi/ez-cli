#! /usr/bin/env node
var yargs = require('yargs');
var copyMod = require('../modules/copy');
var info = require('../modules/info');
var sshMod = require('../modules/ssh');
var nodejs = require('../modules/node');
var speed = require('../modules/speedTest');
var deb = require('../modules/linuxDeb');

var argv = yargs.usage('$0 command')
  .command('calendar', 'Print calendar to terminal', function() {
    return info.calendar();
  })
  .command('copyFile', 'Copy a file somewhere.', function() {
    return copyMod.copyFile();
  })
  .command('copyFolder', 'Copy a folder somewhere.', function() {
    return copyMod.copyFolder();
  })
  .command('copySshKey', 'Copy ssh key to clipboard', function() {
    sshMod.copySshToClipboad();
  })
  .command('linuxUpdates', 'Debian based Linux - get updates.', function() {
    deb.getUpdates();
  })
  .command('driveSpace', 'See how much hard drive space you have.', function() {
    return info.hardDriveSpace();
  })
  .command('listGlobalNpm', 'List globally installed npm packages.', function() {
    return nodejs.listGlobalNpm();
  })
  .command('listPrinters', 'Lists available printers.', function() {
    return info.listPrinters();
  })
  .command('speedTest', 'Run a speedtest from the console.', function() {
    return speed.test();
  })
  .command('viewConfig', 'View EZ-CLI config.', function() {
    return info.seeConfig();
  })
  .command('viewSshKey', 'Prints public ssh key to console.', function() {
    return sshMod.viewSshKey();
  })
  .command('whereAmI', 'Find path to current directory.', function() {
    return info.whereAmI();
  })
  .help('h')
  .alias('h', 'help')
  .argv;