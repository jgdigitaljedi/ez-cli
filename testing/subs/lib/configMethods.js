/*jslint node: true */
/*jslint esnext: true */
/*jslint mocha: true */
'use strict';

const common = require('../../common');

const assert = common.assert;
const chalk = common.chalk;
const expect = common.expect;
const configLib = require('../../../lib/configMethods');
const config = require('../../../system.config');
const options = common.options;
const sinon = common.sinon;

describe('ConfigMethods writeConfig method', () => {
	it('writes the expected config and resolves the promise returning the config', () => {
		configLib
			.writeConfig(config)
			.then((result) => {
				assert(config === result, 'result returned and equals what was sent');
			})
			.catch((err) => {
				throw new Error(err);
			});
	});
});
