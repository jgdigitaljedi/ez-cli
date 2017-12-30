/*jslint node: true */
/*jslint mocha: true */
'use strict';

var common = require('../../common');

var assert = common.assert;
var expect = common.expect;
var helpersLib = require('../../../lib/helpers');
var options = common.options;
var sinon = common.sinon;

describe('Helpers yesNo method', function() {
	it('handles yes answers correctly', function() {
		assert.isTrue(helpersLib.yesNo('YES '));
		assert.isTrue(helpersLib.yesNo(' Y '));
	});

	it('handles no answers correctly', function() {
		assert.isFalse(helpersLib.yesNo(' No '));
		assert.isFalse(helpersLib.yesNo(' n'));
	});
});

describe('Helpers removeLineBreak method', function() {
	it('removes line breaks from end of line correctly', function() {
		assert(
			helpersLib.removeLineBreak('This should remove line breaks\n') === 'This should remove line breaks',
			'line breaks should be removed from the first operation'
		);
	});
});

describe('Helpers puts method', function() {
	it('takes a  STDOUT and logs the result', function() {
		var spy = sinon.spy(console, 'log');
		helpersLib.puts(false, 'This is a test', '', true);
		assert(spy.called);
		assert(spy.calledWith('This is a test'), 'yep');
		console.log.restore();
	});
});
