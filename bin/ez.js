#! /usr/bin/env node
var yargs = require('yargs');
var copy = require('../modules/copy');
var files = require('../modules/files');

var argv = yargs.usage('$0 command')
  .command('copyFolder', 'Copy a folder somewhere.', function () {
    return copy.copyFolder();
  })
  .help('h')
  .alias('h', 'help')
  .argv;