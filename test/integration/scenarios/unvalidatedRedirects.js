/**
 * Created by David on 24.07.14.
 */
var request = require('supertest'),
	chai = require("chai"),
	sinon = require("sinon"),
	sinonChai = require("sinon-chai"),
	expect = chai.expect;
chai.use(sinonChai);

describe('#unvalidatedRedirects', function () {
	var app = require('../../../secureApp/server_secure');

	var secureServer;
	before(function () {
		secureServer = request(app);
	});

	it('should restrict redirects to non-whitelist-urls', function (done) {
		secureServer
			.get('/unvalidatedRedirects')
			.query({url: 'www.notallowedUrl.com'})
			.expect(400, done)
	});

	it('should redirect on whitelist-urls', function (done) {
		secureServer
			.get('/unvalidatedRedirects')
			.query({url: 'www.google.de'})
			.expect(200, done)
	});

});