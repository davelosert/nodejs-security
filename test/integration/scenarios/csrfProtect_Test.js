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
	_ = require('lodash'),
    mongoose = require('mongoose');

describe('#csrfProtection', function () {
	var app = require('../../../secureApp/server_secure');

	var secureServer;
	before(function (done) {
		secureServer = request(app);
        mongoose.connection.on('connected', done);
	});

    after(function (done) {
        mongoose.connection.close(done);
    });

	it('should set a csrf-cookie on a normal get-request', function (done) {
		secureServer
			.get('/csrf')
			.expect('set-cookie', new RegExp(/_csrf=.*; Path=\//gi))
			.expect(200, done);
	});

	it('should not let a request without a token pass', function (done) {
		secureServer
			.post('/csrf')
			.expect(403, done);
	});

	it('should let a post request pass with the right token', function (done) {
		secureServer
			.get('/csrf')
			.end(function (err, res) {
				var csrfCookie = Cookie.parse(res.headers['set-cookie'][0]);
//				var sessionCookie = Cookie.parse(res.headers['set-cookie'][1]);

				secureServer
					.post('/csrf')
                    .set('Content-Type', 'application/json')
					.set('Cookie', res.headers['set-cookie'])
                    .set('X-CSRF-TOKEN', csrfCookie.value)
					.send({test: 'test', _csrf: csrfCookie.value})
					.end(function (err, res) {
                        if(err) console.error(err);
                        console.log(res.text);
						expect(res.status).to.equal(200);
                        done();
					});
			});
	});

});