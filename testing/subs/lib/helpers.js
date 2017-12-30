/*jslint node: true */
/*jslint esnext: true */
/*jslint mocha: true */
'use strict';

const common = require('../../common');

const assert = common.assert;
const chalk = common.chalk;
const expect = common.expect;
const helpersLib = require('../../../lib/helpers');
const options = common.options;
const sinon = common.sinon;

describe('Helpers yesNo method', () => {
	it('handles yes answers correctly', () => {
		assert.isTrue(helpersLib.yesNo('YES '));
		assert.isTrue(helpersLib.yesNo(' Y '));
	});

	it('handles no answers correctly', () => {
		assert.isFalse(helpersLib.yesNo(' No '));
		assert.isFalse(helpersLib.yesNo(' n'));
	});
});

describe('Helpers removeLineBreak method', () => {
	it('removes line breaks from end of line correctly', () => {
		assert(
			helpersLib.removeLineBreak('This should remove line breaks\n') === 'This should remove line breaks',
			'line breaks should be removed from the first operation'
		);
	});
});

describe('Helpers puts method', () => {
	it('takes a  STDOUT and logs the result', function() {
		const spy = sinon.spy(console, 'log');
		helpersLib.puts(false, 'This is a test', '');
		assert(spy.called);
		assert(spy.calledWith(common.chalk.cyan('This is a test')), 'expected STDOUT logged with expected chalk color');
		console.log.restore();
	});
});

describe('Helpers homeShort method', () => {
	it('returns the full path to $HOME (~/)', () => {
		return helpersLib
			.homeShort()
			.then((result) => {
				expect(result).to.equal('/home/joey\n');
			})
			.catch((err) => {
				throw new Error(err);
			});
	});
});
