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

var Cookie = require('tough-cookie'),
	_ = require('lodash');

describe('#csrfProtection', function () {
	var app = require('../../../secureApp/server_secure');

	var secureServer;
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

	it('should let a post request pass with the right token', function (done) {
		secureServer
			.get('/')
			.end(function (err, res) {
				var csrfCookie = Cookie.parse(res.headers['set-cookie'][0]);

				secureServer
					.post('/csrf')
					.send({'_csrf': csrfCookie.value})
					.set('x-csrf-token', csrfCookie.value)
					.end(function (err, res) {
						expect(res.status).to.be(200);
					});
			});
	});

});