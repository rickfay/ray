/**
 * COG Framework Logging API
 *
 * TODO Implement this correctly...
 */
cog.Class.define("Log", null, {

    /**
     * Log ERROR level message
     *
     * @param msg
     */
    error: msg => {
        console.error(msg);
    },

    /**
     * Log INFO level message
     *
     * @param msg
     */
    info: msg => {
        console.info(msg);
    },

    /**
     * Log DEBUG level message
     *
     * @param msg
     */
    debug: msg => {
        if (cog.Metadata.Config.DEBUG) {
            console.debug(msg);
        }
    },

    /**
     * Log WARN level message
     *
     * @param msg
     */
    warn: msg => {
        console.warn(msg);
    }
});