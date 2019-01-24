/**
 * COG Framework Event Management System
 */
cog.Class.service("Events", {

    construct: function construct() {
        this.events = {};
    },

    debug: function debug() {
        return this.events;
    },

    /**
     * Publish an Event
     *
     * @param eventName
     * @param id
     * @param args
     * @returns {{}}
     */
    pub: function pub(eventName, id, ...args) {
        return this.events[eventName] ? this.events[eventName].trigger(...args) : null;
    },

    /**
     * Subscribe to an Event
     *
     * @param eventName
     * @param id
     * @param callback
     */
    sub: function sub(eventName, id, callback) {

        if (!this.events[eventName]) {
            this.events[eventName] = cog.Class.new("Event", eventName);
        }

        this.events[eventName].addSub(id, callback);
    }
});