/**
 * User: timo.mayer
 * Date: 24.07.2014
 */

var express = require('express'),
    _ = require('lodash'),
    crypto = require('crypto'),
    fs = require('fs');

module.exports = function (app) {

    app.use('/static', express.static(__dirname + '/../public'));

    var accessReferenceMap = {};

    var allFilesInPublic = fs.readdirSync(__dirname + '/../public');

    console.log(allFilesInPublic);

    _.each(allFilesInPublic, function(fileName) {

        shasum = crypto.createHash('sha1');
        shasum.update("foo");

        _.extend(accessReferenceMap, {directReference: fileName, indirect: shasum.digest('hex')});

        console.log({directReference: fileName, indirect: shasum.digest('hex')});

    });

    // iterate over all files in public folder and map them to randomized indirect references

	return {
        /**
         * TYPE: DOR (Insecure Direct Object_References)
         *
         * DANGER: Unauthorized access to files, DB entries and other resources by calling unprotected URLs and anticipatable filenames.
         *
         * EXPLANATION:
         */
		getFile: function (req, res) {
			res.send(200, "Link to your file : <a href='/static/file1.txt'>file1.txt</a> There are other top secret files you are not authorised for, can you find them ;)?");
		}
	}
};