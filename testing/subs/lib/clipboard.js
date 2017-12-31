/*jslint node: true */
/*jslint esnext: true */
/*jslint mocha: true */
'use strict';

const common = require('../../common');

const assert = common.assert;
const chalk = common.chalk;
const expect = common.expect;
const clipboardLib = require('../../../lib/clipboard');
const options = common.options;
const sinon = common.sinon;

describe('Clipboard setClipboard method', () => {
	it('sets the clipboard and logs the success message', () => {
		const spy = sinon.spy(console, 'log');
		clipboardLib.setClipboard('test', 'failure', 'passed');

		// setTimeout used because node-clip dependency methods are slower
		setTimeout(() => {
			assert(spy.called);
			assert(
				spy.calledWith(common.chalk.green('passed')),
				'expected success message logged with expected chalk color'
			);
		}, 250);
		console.log.restore();
	});
});
