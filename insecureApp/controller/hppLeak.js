/**
 * Created with IntelliJ IDEA.
 * User: david.losert
 * Date: 23.07.2014
 * Time: 15:10
 */

module.exports = function (app) {
    return {
        /**
         * TYPE: HPP (HTTP PARAMETER POLUTION)
         * DANGER: DoS (with Single request) / Mutuate State
         * EXPLANATION:
         * The Data of a Request is passed as a Data-Object within req.query (for GET) or req.body (for POST).
         * If there are two fields inside the Request with the same Key (e.g. ?firstname=JOHN&firstname=JOHN), the resulting
         * property of the Data-Object will be an Array instead of a String. This can cause an uncaught Exception in your
         * Application as shown below.
         */
        trustParameterTypes: function (req, res) {
            //
            // First we extract the Data from GET ...?id=MYDBID&id=MALICIOUSID
            var data = req.query || req.body;

            // Since there are two Properties with the same key, Id is not a String anymore....
            console.log('Type is not a String: ', typeof(data.id));
            // ... but an instance of Array
            console.log('Id is instance of array: ', data.id instanceof Array);

            // This means typical String-Operations like "trim()" will just cause an TypeError.
            // At this point, EXPRESS still has a try/catch-Block around
            // the route and therefore will safely catch the error...
            data.id.trim();

            // ... this changes if you execute the operation within an async callback
            setTimeout(function () {
                // The TypeError thrown here is not within any try/catch Block and will therefore crash your whole
                // application, making it easy to DoS your App by just one single request.
                data.id.trim();
            }, 0);

            // @todo Show Threat of Mutuating APP-State e.g. by letting App safe Array instead of String in MongoDB
        }
    }
}