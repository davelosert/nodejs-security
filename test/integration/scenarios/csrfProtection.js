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
	var app = require('../../../secureApp/server_secure');
	var secureServer = request(app);
    it('should set a csrf-cookie on a normal get-request', function (done) {
        secureServer
           .get('/')
           .expect(200, done);
    });

    it('should not let a request without a token pass', function (done) {
       secureServer
           .post('/csrf')
		   .expect(403, done);
    });
});