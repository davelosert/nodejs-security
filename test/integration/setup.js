/**
 * Created with IntelliJ IDEA.
 * User: david.losert
 * Date: 18.07.2014
 * Time: 15:37
 */


describe('SECUREAPP TESTRUNNE', function () {
	require('./scenarios/csrfProtect_Test');
//	require('./scenarios/mflacProtect_Test');
	require('./scenarios/unvalidatedRedirects');
});