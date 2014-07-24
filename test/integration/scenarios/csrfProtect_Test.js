/**
 * Created with IntelliJ IDEA.
 * User: david.losert
 * Date: 18.07.2014
 * Time: 16:11
 */
var request = require('supertest'),
	chai = require("chai"),
	sinon = require("sinon"),
	sinonChai = require("sinon-chai"),
	expect = chai.expect;
chai.use(sinonChai);

describe('#csrfProtection', function () {
	var secureServer;
	var app = require('../../../secureApp/server_secure');
	before(function () {
		secureServer = request(app);
	});
	it('should set a csrf-cookie on a normal get-request', function (done) {
		secureServer
			.get('/')
			.expect('set-cookie', new RegExp(/XSRF-TOKEN=.*; Path=\//gi))
			.expect(200, done);
	});

	it('should not let a request without a token pass', function (done) {
		secureServer
			.post('/csrf')
			.expect(403, done);
	});

	xit('should let a post request pass with the right token', function (done) {

	});

});