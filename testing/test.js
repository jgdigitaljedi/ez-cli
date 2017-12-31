/*jslint node: true */
/*jslint mocha: true */
'use strict';

var common = require('./common');

var assert = common.assert;
var options = common.options;

common.chai.use(common.sinonChai);

function importTest(name, path) {
	describe(name, function() {
		require(path);
	});
}

// libs, which honestly are most important and testable
importTest('clipboard lib methods', './subs/lib/clipboard');
importTest('configMethods lib methods', './subs/lib/configMethods');
importTest('helpers lib methods', './subs/lib/helpers');

// modules, which are not very testable
// also, tests on the modules are subject to differences in OS so might not be valuable anyway
importTest('fun modules methods', './subs/modules/fun');
