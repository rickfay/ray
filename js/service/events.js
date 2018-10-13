/**
 * COG Framework Event Management System
 */
cog.Class.service("Events", {

    /**
     * Publish an Event
     *
     * @param eventName
     * @param id
     * @param args
     * @returns {{}}
     */
    pub: function pub(eventName, id, ...args) {
        let event = cog.Util.ref(this, "events", id, eventName);
        return event ? event.trigger(...args) : null;
    },

    /**
     * Subscribe to an Event
     *
     * @param eventName
     * @param id
     * @param callback
     */
    sub: function sub(eventName, id, callback) {

        let myEvents = cog.Util.buildRef(this, "events", id);

        if (cog.Util.isEmpty(myEvents[eventName])) {
            myEvents[eventName] = cog.Class.new("Event", eventName);
        }

        myEvents[eventName].addSub(eventName, callback);
    }
});