/**
 * COG Framework Logging API
 *
 * TODO Implement this correctly...
 */
cog.Class.singleton("Log", {

    construct: function construct() {
        console.debug("Initializing cog logging system...");
    },

    /**
     * Log ERROR level message
     *
     * @param msg
     */
    error: function error(msg) {
        console.error(msg);
    },

    /**
     * Log INFO level message
     *
     * @param msg
     */
    info: function info(msg) {
        console.info(msg);
    },

    /**
     * Log DEBUG level message
     *
     * @param msg
     */
    debug: function debug(msg) {
        console.debug(msg);
    },

    /**
     * Log WARN level message
     *
     * @param msg
     */
    warn: function warn(msg) {
        console.warn(msg);
    }
});