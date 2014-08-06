/**
 * Created with IntelliJ IDEA.
 * User: david.losert
 * Date: 18.07.2014
 * Time: 16:11
 */
var request = require('supertest'),
    session = require('supertest-session'),
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
            .end(function (err, res) {
                console.log(res.text);
                done();
            });
    });

    describe('CSRF-Token use', function () {
        var csrfCookie,
            sessionCookie;

        it('should recieve another token', function (done) {
            secureServer
                .get('/csrf')
                .end(function (err, res) {
                    csrfCookie = Cookie.parse(res.headers['set-cookie'][0]);
                    sessionCookie = Cookie.parse(res.headers['set-cookie'][1]);
                    done();
                });
        });

        it('should allow access with a valid token', function (done) {
                secureServer
                    .post('/csrf')
                    .set('Cookie', sessionCookie.cookieString())
                    .set('Content-Type', 'application/json')
                    .send({"_csrf": csrfCookie.value, test: 'test'})
                    .end(function (err, res2) {
                        expect(res2.status).to.equal(200);
                        done();
                    });
        });
    });
});