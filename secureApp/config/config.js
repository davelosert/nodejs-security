/**
 * Created with IntelliJ IDEA.
 * User: david.losert
 * Date: 18.07.2014
 * Time: 15:44
 */

var config = {
	'development': {
		'mongoDB': {

		}
	},
	'test'       : {
		'mongoDB': {

		}
	}
}

module.exports = config[process.env.NODE_ENV || 'development'];