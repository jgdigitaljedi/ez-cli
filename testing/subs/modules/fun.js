/*jslint node: true */
/*jslint esnext: true */
/*jslint mocha: true */
'use strict';

const common = require('../../common');

const assert = common.assert;
const expect = common.expect;
const funModule = require('../../../modules/fun');
const options = common.options;
const sinon = common.sinon;

describe('Fun makeMeASandwich method', () => {
	it("tells you that it can't make a sandwich", () => {
		const spy = sinon.spy(console, 'log');
		funModule.makeASandwich();
		assert(spy.called);
		assert(
			spy.calledWith(common.chalk.red('MAKE IT YOURSELF!!')),
			'console logged output is same as expected response'
		);
		console.log.restore();
	});
});
