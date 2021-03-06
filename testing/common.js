/*jslint node: true */
/*jslint mocha: true */
'use strict';

var chai = require('chai');
var chalk = require('chalk');
var sinon = require('sinon');
var sinonMocha = require('mocha-sinon');
var sinonChai = require('sinon-chai');

var options = {
	foo: 'foo'
};

exports.chai = chai;
exports.assert = chai.assert;
exports.expect = chai.expect;

exports.chalk = chalk;
exports.options = options;

exports.sinon = sinon;
exports.sinonChai = sinonChai;
exports.sinonMocha = sinonMocha;
