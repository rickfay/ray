/**
 * COG Ajax Utilities
 *
 * @type {{get: (function(*=, *=): (*|{readyState, getResponseHeader, getAllResponseHeaders, setRequestHeader, overrideMimeType, statusCode, abort}))}}
 */
cog.Ajax = {

    /**
     * Ajax GET
     *
     * @param url
     * @param callback
     * @returns {*|{readyState, getResponseHeader, getAllResponseHeaders, setRequestHeader, overrideMimeType, statusCode, abort}}
     */
    get: function get(url, callback) {
        return $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            success: callback,
            error: function (jqXHR, textStatus, errorThrown) {
                alert(`The following error occurred: ${jqXHR} || ${textStatus} || ${errorThrown} || ${jqXHR.responseText}`);
            }
        });
    }
};