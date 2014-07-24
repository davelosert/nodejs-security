/**
 * Created by David on 24.07.14.
 */

var request = require('supertest'),
	chai = require("chai"),
	sinon = require("sinon"),
	sinonChai = require("sinon-chai"),
	expect = chai.expect;
chai.use(sinonChai);

describe('#mflacProtect', function () {
	var app = require('../../../secureApp/server_secure');
	var secureServer = request(app);

	it('should give normal data to any user', function (done) {
		secureServer
			.get('/mflac/readPublicData')
			.expect(200, done);
	});

	it('should restrict access to admin user', function (done) {
		secureServer
			.get('/mflac/readPrivateData')
			.expect(401, done);
	});


});