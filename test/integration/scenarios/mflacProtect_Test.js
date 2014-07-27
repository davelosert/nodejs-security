/**
 * Created by David on 24.07.14.
 */

var request = require('supertest'),
    chai = require("chai"),
    sinon = require("sinon"),
    sinonChai = require("sinon-chai"),
    expect = chai.expect;
chai.use(sinonChai);

//@todo not ready yet
describe('#mflacProtect', function () {
    var app = require('../../../secureApp/server_secure');
    var secureServer = request.agent(app);

    describe('before login', function () {
        it('should give normal data to any user', function (done) {
            secureServer
                .get('/mflac/readPublicData')
                .expect(200, done);
        });

        it('should restrict access to admin user', function (done) {
            secureServer
                .get('/mflac/readPrivateData')
                .expect(500, done); //todo (dlo) This should be a 401
        });
    });

    describe('after login', function () {
        before(function (done) {
            secureServer
                .get('/login')
                .expect(200, done);
        });

        it('should still give access to normal data', function (done) {
            secureServer
                .get('/mflac/readPublicData')
                .expect(200, done);
        });

        it('should give access to admin user', function (done) {
            secureServer
                .get('/mflac/readPrivateData')
                .expect(200, done);
        });
    });
})
;