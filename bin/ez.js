#! /usr/bin/env node
var yargs = require('yargs');
var copy = require('../modules/copy');
var info = require('../modules/info');

var argv = yargs.usage('$0 command')
  .command('copyFolder', 'Copy a folder somewhere.', function() {
    return copy.copyFolder();
  })
  .command('whereAmI', 'Find path to current directory.', function() {
    return info.whereAmI();
  })
  .command('driveSpace', 'See how much hard drive space you have.', function () {
    return info.hardDriveSpace();
  })
  .command('calendar', 'Print calendar to terminal', function() {
    return info.calendar();
  })
  .help('h')
  .alias('h', 'help')
  .argv;