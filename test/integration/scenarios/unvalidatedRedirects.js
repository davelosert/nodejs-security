/**
 * Created by David on 24.07.14.
 */
var request = require('supertest'),
	chai = require("chai"),
	sinon = require("sinon"),
	sinonChai = require("sinon-chai"),
	expect = chai.expect;
chai.use(sinonChai);

xdescribe('#unvalidatedRedirects', function () {
	var app = require('../../../secureApp/server_secure');

	var secureServer;
	before(function () {
		secureServer = request(app);
	});

	it('should restrict redirects to non-whitelist-urls', function (done) {
		secureServer
			.get('')
			.expect(400, done)
	});

	it('should redirect on whitelist-urls', function (done) {

	});

});