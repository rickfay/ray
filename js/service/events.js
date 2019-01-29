/**
 * COG Framework Event Management System
 */
cog.Class.service("Events", (function Events() {

    function trigger(event, namespace, ...args) {

        let callbackReturns = [];
        for (let callback of event[namespace]) {
            if (typeof callback === "function") {
                callbackReturns.push(callback(...arguments));
            }
        }

        return callbackReturns;
    }

    return {

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
        pub: function pub(eventName, namespace, ...args) {
            return this.events[eventName]
                ? trigger(this.events[eventName], namespace, ...args)
                : null;
        },

        /**
         * Subscribe to an Event
         *
         * @param namespace
         * @param eventName
         * @param callback
         */
        sub: function sub(eventName, namespace, callback) {
            let event = cog.Util.buildRef(this.events, eventName);

            if (!event[namespace]) {
                event[namespace] = [];
            }

            event[namespace].push(callback);
        }
    }
})());