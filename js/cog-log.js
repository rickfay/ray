/**
 * COG Framework Logging API
 *
 * TODO Implement this correctly...
 *
 * @type {{error: cog.Log.error, info: cog.Log.info, debug: cog.Log.debug, warn: cog.Log.warn}}
 */
cog.Log = {

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
};