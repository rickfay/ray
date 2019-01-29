/**
 * COG Framework Event Management System
 */
cog.Class.service("Events", {

    construct: function construct() {
        this.events = {};
    },

    /**
     * FIXME This is just for debugging.
     *
     * @returns {{}|*}
     */
    getEvents: function debug() {
        return this.events;
    },

    /**
     * Publish an Event
     *
     * @param eventName
     * @param args
     * @returns {{}}
     */
    pub: function pub(eventName, ...args) {
        return this.events[eventName] ? this.events[eventName].trigger(...args) : null;
    },

    /**
     * Subscribe to an Event
     *
     * @param namespace
     * @param eventName
     * @param callback
     */
    sub: function sub(eventName, namespace, callback) {

        if (!this.events[eventName]) {
            this.events[eventName] = cog.Class.new("Event", eventName);
        }

        this.events[eventName].addSub(namespace, callback);
    }
});