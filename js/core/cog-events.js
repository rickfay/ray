/**
 * COG Framework Event Management System
 *
 * @constructor
 */

cog.Class.define("Events", null, {

    /**
     * Constructor
     */
    construct: function construct() {
        this.events = {};
    },

    /**
     * Publish an Event
     *
     * @param eventName
     * @param args
     * @returns {{}}
     */
    pub: function pub(eventName, ...args) {
        let event = cog.Util.ref(this.events, this.id, eventName);
        return event ? event.trigger(...args) : null;
    },

    /**
     * Subscribe to an Event
     *
     * @param eventName
     * @param callback
     */
    sub: function sub(eventName, callback) {

        let myEvents = cog.Util.buildRef(this.events, this.id);

        if (cog.Util.isEmpty(myEvents[eventName])) {
            myEvents[eventName] = cog.Factory.construct("Event", eventName);
        }

        myEvents[eventName].addSub(eventName, callback);
    }
});