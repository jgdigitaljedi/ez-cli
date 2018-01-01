/*jslint node: true */
'use strict';
var log = require('../lib/log');

/** Just some extra fun methods callable by passing arguments in command line
 * @module modules/fun
 */
module.exports = {
	makeASandwich: function(test) {
		log.err('MAKE IT YOURSELF!!');
	},
	sudoMakeMeASandwich: function() {
		log.success('OKAY');
		log.general('                          ____');
		log.general("              .----------'    '-.");
		log.general("             /  .      '     .   \\\\");
		log.general("            /        '    .      /|");
		log.general('           /      .             \\ /');
		log.general("          /  ' .       .     .  || |");
		log.general("         /.___________    '    / //");
		log.general("         |._          '------'| /|");
		log.general("         '.............______.-' /  ");
		log.general('         |-.                  | /');
		log.general('         `"""""""""""""-.....-\'');
	}
};
