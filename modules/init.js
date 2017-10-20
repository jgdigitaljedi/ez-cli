'use strict';

var os = require('os');
var config = require('../system.config');
var configMethods = require('../lib/configMethods');
var exec = require('child_process').exec;
var inquire = require('inquirer');
var chalk = require('chalk');

function linuxCheck(plat) {
    return new Promise((resolve, reject) => {
        if (plat === 'linux' || plat === 'freebsd') {
            exec('lsb_release -ds 2>/dev/null || cat /etc/*release 2>/dev/null | head -n1 || uname -om')
                .stdout.on('data', function(data) {
                    var version = data.toLowerCase();
                    config.linux.version = version;
                    if (version.indexOf('ubuntu') >= 0 || version.indexOf('debian') >= 0) {
                        config.linux.packageManager = 'debian';
                    }
                });
        } else {
            resolve(true);
        }
    });
}

module.exports = {
    writeConfig: function() {
        // platform
        var plat = os.platform();
        config.platform = plat;
        
        // unix
        config.unix = (plat === 'linux' || plat === 'darwin' || plat === 'freebsd');

        // linux version and packageManager
        linuxCheck(plat)
            .then(function(result) {
                inquire.prompt([
                    {
                        // zipcode
                        name: 'zip',
                        type: 'input',
                        message: 'What is your zipcode (for weather info)?'
                    },
                    {
                        // teachMode
                        name: 'teach',
                        type: 'input',
                        message: 'Teach Mode echo\'s the commands that are run in an effort to help teach you terminal commands. Would you like to enable Teach Mode? (y/N)',
                        default: false
                    },
                    {
                        // windows git-bash
                        name: 'windblows',
                        type: 'list',
                        message: 'Are you using Git-Bash (or CygWin or something similar) OR regular Windows CMD.exe?',
                        choices: ['Git-Bash', 'CMD.exe'],
                        default: 0,
                        when: function(currAnswers) {
                            return plat === 'win32';
                        }
                    }
                ]).then(function(answers) {
                    config.zipcode = answers.zip;
                    config.teachMode = (answers.teach.toLowerCase() === 'y' || answers.teach.toLowerCase() === 'yes');
                    if (plat === 'win32') {
                        config.windows.gitBash = answers.windblows === 0;
                    }
                    configMethods.writeConfig(config);
                    console.log(chalk.italic.cyan('Success! Your config is written!'));
                });
            });

    }
};
