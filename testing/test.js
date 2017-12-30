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

importTest('helpers lib methods', './subs/lib/helpers');
importTest('fun modules methods', './subs/modules/fun');
