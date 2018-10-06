/**
 * COG Ajax Utilities
 */
cog.Class.define("Ajax", null, {

    /**
     * Ajax GET
     *
     * @param url
     * @param callback
     */
    get: function get(url, callback) {

        let request = new XMLHttpRequest();
        request.open("GET", url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                callback(request.response);
            } else {
                console.error("We reached our target server, but it returned an error");
            }
        };

        request.onerror = function() {
            console.error("There was a connection error of some sort");
        };

        request.open("GET", url, true);
        request.send();
    },

    /**
     * Ajax POST
     *
     * @param url
     * @param data
     */
    post: function post(url, data) {
        let request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(data);
    }
});