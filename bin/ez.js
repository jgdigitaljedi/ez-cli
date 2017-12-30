#! /usr/bin/env node
/*jslint node: true */
var configEx = require('../modules/configExposed');
var copyMod = require('../modules/copy');
var fun = require('../modules/fun');
var git = require('../modules/git');
var info = require('../modules/info');
var init = require('../modules/init');
var installs = require('../modules/installs');
var linux = require('../modules/linux');
var nodejs = require('../modules/node');
var speed = require('../modules/speedTest');
var sshMod = require('../modules/ssh');
var term = require('../modules/term');
var yargs = require('yargs');

var argv = yargs
	.usage('$0 command')
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
	.command('gitAll', 'Runs git status, add, commit (you type message), and pushes to current branch.', function() {
		return git.gitAll();
	})
	.command('init', 'Gathers system info for EZ-CLI to work correctly.', function() {
		init.writeConfig();
	})
	.command('installCurl', 'Installs curl command line utility', function() {
		return installs.installCurl();
	})
	.command('installOhMyZsh', 'Installs Oh-My-Zsh', function() {
		return installs.installOhMyZsh();
	})
	.command('installthefuck', 'Installs Oh-My-Zsh', function() {
		return installs.installThefuck();
	})
	.command('linuxUpdates', 'Debian based Linux - get updates.', function() {
		linux.getUpdates();
	})
	.command('makeMeASandwich', 'Makes you a sandwich', function() {
		fun.makeASandwich();
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
	.command('shellEnvVar', 'Adds environment variable to shell.', function() {
		return term.envVar();
	})
	// .command('shellSource', 'Re-sources shell (updates any env or config changes).', function() {
	//   return term.resource();
	// })
	.command('speedTest', 'Run a speedtest from the console.', function() {
		return speed.test();
	})
	.command('sshKeyClip', 'Copy ssh key to clipboard', function() {
		sshMod.copySshToClipboad();
	})
	.command('sshKeyView', 'Prints public ssh key to console.', function() {
		return sshMod.viewSshKey();
	})
	.command('sudoMakeMeASandwich', 'Good job!', function() {
		return fun.sudoMakeMeASandwich();
	})
	.command('whereAmI', 'Find path to current directory.', function() {
		return info.whereAmI();
	})
	.help('h')
	.alias('h', 'help').argv;
