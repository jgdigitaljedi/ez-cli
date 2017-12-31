/*jslint node: true */
/*jslint esnext: true */
/*jslint mocha: true */
'use strict';

const common = require('../../common');

const assert = common.assert;
const chalk = common.chalk;
const expect = common.expect;
const logLib = require('../../../lib/log');
const options = common.options;
const sinon = common.sinon;
