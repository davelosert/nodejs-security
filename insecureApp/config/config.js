/**
 * Application related configuration like Database-Connections, Ports, Default-Values and whatsoever...
 * User: david.losert
 * Date: 18.07.2014
 * Time: 15:44
 */

var config = {
	'development': {
		'mongoDB': {
			host  : '192.168.2.105',
			port  : 27017,
			dbName: 'insecureApp'
		}
	},
	'test'       : {
		'mongoDB': {
			host  : 'localhost',
			port  : 27017,
			dbName: 'insecureApp_Test'

		}
	}
};

module.exports = config[process.env.NODE_ENV || 'development'];